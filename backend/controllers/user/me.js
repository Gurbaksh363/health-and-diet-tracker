import ApiError from "../../middleware/error-handler.js";

const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(new ApiError(500, "Failed to fetch user data", "FETCH_USER_ERROR", error.message));
    }
};

export { getMe };