import jwt from "jsonwebtoken";
import ApiError from "./error-handler.js";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError(401, "No token provided", "UNAUTHORIZED"));
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

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
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError(401, "No token provided", "UNAUTHORIZED"));
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

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
