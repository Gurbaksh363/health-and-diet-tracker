import ApiError from "../../middleware/error-handler.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from "../util/email.js";
import redisClient from "../../config/redis.js";
import config from "../../config/index.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new ApiError(400, "Name, email, and password are required", "VALIDATION_ERROR", "Must provide name, email, and password"));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(new ApiError(400, "Invalid email format", "VALIDATION_ERROR", "Must provide a valid email address"));
        }

        if (password.length < 6) {
            return next(new ApiError(400, "Password must be at least 6 characters long", "VALIDATION_ERROR", "Must provide a password with at least 6 characters"));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError(409, "User with this email already exists", "USER_EXISTS", "Email already registered"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        await redisClient.setex(`email_verification:${email}`, 10 * 60, verificationToken);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isEmailVerified: false,
        });
        await newUser.save();

        try {
            await sendVerificationEmail(email, name, verificationToken);
        } catch (emailError) {
            console.error("Error sending verification email:", emailError);
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email to verify your account.",
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isEmailVerified: newUser.isEmailVerified,
                },
            },
        });
    } catch (error) {
        next(new ApiError(500, "Error registering user", "REGISTRATION_ERROR", error.message));
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            return next(new ApiError(400, "Verification token is required", "VALIDATION_ERROR", 'Must provide a verification token'));
        }

        const { email } = req.query;

        if (!email) {
            return next(new ApiError(400, "Email is required for verification", "VALIDATION_ERROR", 'Must provide an email for verification'));
        }

        // Get token from Redis
        const storedToken = await redisClient.get(`email_verification:${email}`);

        if (!storedToken || storedToken !== token) {
            return next(new ApiError(400, "Invalid or expired verification token", "INVALID_TOKEN", "The provided verification token is invalid or has expired"));
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ApiError(404, "User not found", "USER_NOT_FOUND", 'No user found for the provided email'));
        }

        user.isEmailVerified = true;
        await user.save();

        await redisClient.del(`email_verification:${email}`);

        try {
            await sendWelcomeEmail(user.email, user.name);
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
        }

        const { login } = req.query;
        let accessToken = null;
        if (login) {
            const sessionToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: "30d" });
            accessToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: "10m" });

            // Store session in Redis (30 days)
            await redisClient.setex(`session:${user._id}`, 30 * 24 * 60 * 60, "active");

            res.cookie("session_token", sessionToken, {
                httpOnly: true,
                secure: config.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
        }

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isEmailVerified: user.isEmailVerified,
                },
            },
            token: accessToken
        });
    } catch (error) {
        next(new ApiError(500, "Error verifying email", "VERIFICATION_ERROR", error.message));
    }
};

const resendVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ApiError(400, "Email is required", "VALIDATION_ERROR", 'Must provide an email address'));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ApiError(404, "User not found", "USER_NOT_FOUND", 'No user found for the provided email'));
        }

        if (user.isEmailVerified) {
            return next(new ApiError(400, "Email is already verified", "ALREADY_VERIFIED", 'The email address has already been verified'));
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        await redisClient.setex(`email_verification:${email}`, 10 * 60, verificationToken);

        await sendVerificationEmail(email, user.name, verificationToken);

        res.status(200).json({
            success: true,
            message: "Verification email sent successfully",
        });
    } catch (error) {
        next(new ApiError(500, "Error resending verification email", "RESEND_ERROR", error.message));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError(400, "Email and password are required", "VALIDATION_ERROR", "Must provide email and password"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS", "No user found for the provided email"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS", "The provided password is incorrect"));
        }

        if (!user.isEmailVerified) {
            return next(new ApiError(403, "Please verify your email before logging in", "EMAIL_NOT_VERIFIED", "Email address is not verified"));
        }

        const sessionToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: "30d" });
        const accessToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: "10m" });

        // Store session in Redis (30 days)
        await redisClient.setex(`session:${user._id}`, 30 * 24 * 60 * 60, "active");

        res.cookie("session_token", sessionToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    height: user.height,
                    weight: user.weight,
                    isEmailVerified: user.isEmailVerified,
                },
                token: accessToken,
            },
        });
    } catch (error) {
        next(new ApiError(500, "Error logging in", "LOGIN_ERROR", error.message));
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ApiError(400, "Email is required", "VALIDATION_ERROR"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal that user doesn't exist for security
            return res.status(200).json({
                success: true,
                message: "If an account exists with this email, a password reset link has been sent.",
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store token in Redis (expires in 1 hour)
        await redisClient.setex(`password_reset:${email}`, 60 * 60, resetToken);

        // Send password reset email
        try {
            await sendPasswordResetEmail(email, user.name, resetToken);
        } catch (emailError) {
            console.error("Error sending password reset email:", emailError);
            return next(new ApiError(500, "Error sending password reset email", "EMAIL_ERROR"));
        }

        res.status(200).json({
            success: true,
            message: "If an account exists with this email, a password reset link has been sent.",
        });
    } catch (error) {
        next(new ApiError(500, "Error processing password reset request", "RESET_ERROR", error.message));
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { token, email, newPassword } = req.body;

        if (!token || !email || !newPassword) {
            return next(new ApiError(400, "Token, email, and new password are required", "VALIDATION_ERROR"));
        }

        if (newPassword.length < 6) {
            return next(new ApiError(400, "Password must be at least 6 characters long", "VALIDATION_ERROR"));
        }

        // Get token from Redis
        const storedToken = await redisClient.get(`password_reset:${email}`);

        if (!storedToken || storedToken !== token) {
            return next(new ApiError(400, "Invalid or expired reset token", "INVALID_TOKEN"));
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ApiError(404, "User not found", "USER_NOT_FOUND"));
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Delete token from Redis
        await redisClient.del(`password_reset:${email}`);

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        next(new ApiError(500, "Error resetting password", "RESET_ERROR", error.message));
    }
};

const logout = async (req, res, next) => {
    try {
        // Delete session from Redis if user is authenticated

        await redisClient.del(`session:${req.user._id}`);


        res.clearCookie("session_token", {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "Strict",
        });
        await redisClient.del(`session:${req.userId}`);

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        next(new ApiError(500, "Error logging out", "LOGOUT_ERROR", error.message));
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const sessionToken = req.cookies.session_token;

        if (!sessionToken) {
            return next(new ApiError(401, "No session token provided", "UNAUTHORIZED", "User is not logged in"));
        }

        let decoded;


        try {
            decoded = jwt.verify(sessionToken, config.JWT_SECRET);
        } catch (err) {
            return next(new ApiError(401, "Invalid session token", "UNAUTHORIZED", "Session token is invalid or expired"));
        }

        const session = await redisClient.get(`session:${decoded.userId}`);
        // console.log(session)
        if (!session) {
            throw new ApiError(401, "Session expired. Please log in again.", "SESSION_EXPIRED", "No active session found for the user");
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, config.JWT_SECRET, { expiresIn: "10m" });

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: accessToken,
        });
    } catch (error) {
        next(new ApiError(500, "Error refreshing token", "TOKEN_ERROR", error.message));
    }
};

export {
    register,
    verifyEmail,
    resendVerificationEmail,
    login,
    forgotPassword,
    resetPassword,
    logout,
    refreshToken,
};