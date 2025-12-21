import jwt from "jsonwebtoken";
import ApiError from "./error-handler.js";
import User from "../models/user.js";
import memoryStore from "../config/redis.js";

export const authenticate = async (req, res, next) => {
    try {
        let token = null;
        let isSessionToken = false;

        // Try to get token from Authorization header (access token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // If no access token, try session token from cookie
        if (!token && req.cookies?.session_token) {
            token = req.cookies.session_token;
            isSessionToken = true;
        }

        if (!token) {
            return next(new ApiError(401, "No token provided", "UNAUTHORIZED"));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        // If it's a session token, check if it's still valid in memory store
        if (isSessionToken) {
            const sessionExists = await memoryStore.get(`session:${decoded.userId}`);
            if (!sessionExists) {
                return next(new ApiError(401, "Session expired or invalid", "SESSION_EXPIRED"));
            }
        }

        // Check if user exists
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return next(new ApiError(401, "User not found", "UNAUTHORIZED"));
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return next(new ApiError(403, "Please verify your email", "EMAIL_NOT_VERIFIED"));
        }

        // Attach user info to request
        req.userId = decoded.userId;
        req.user = user;

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Invalid token", "INVALID_TOKEN"));
        }
        if (error.name === "TokenExpiredError") {
            return next(new ApiError(401, "Token expired", "TOKEN_EXPIRED"));
        }
        next(new ApiError(500, "Authentication error", "AUTH_ERROR", error.message));
    }
};

// Optional: Middleware that doesn't require email verification
export const authenticateWithoutVerification = async (req, res, next) => {
    try {
        let token = null;
        let isSessionToken = false;

        // Try to get token from Authorization header (access token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // If no access token, try session token from cookie
        if (!token && req.cookies?.session_token) {
            token = req.cookies.session_token;
            isSessionToken = true;
        }

        if (!token) {
            return next(new ApiError(401, "No token provided", "UNAUTHORIZED"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        // If it's a session token, check if it's still valid in memory store
        if (isSessionToken) {
            const sessionExists = await memoryStore.get(`session:${decoded.userId}`);
            if (!sessionExists) {
                return next(new ApiError(401, "Session expired or invalid", "SESSION_EXPIRED"));
            }
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return next(new ApiError(401, "User not found", "UNAUTHORIZED"));
        }

        req.userId = decoded.userId;
        req.user = user;

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Invalid token", "INVALID_TOKEN"));
        }
        if (error.name === "TokenExpiredError") {
            return next(new ApiError(401, "Token expired", "TOKEN_EXPIRED"));
        }
        next(new ApiError(500, "Authentication error", "AUTH_ERROR", error.message));
    }
};
