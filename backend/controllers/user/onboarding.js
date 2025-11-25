
import ApiError from "../../middleware/error-handler.js";
import User from "../../models/user.js";

const OnboardUser = async (req, res, next) => {
    try {
        const {
            age,
            height,
            weight,
            gender,
            dietaryPreferences,
            waterIntakeGoal,
            sleepGoal,
            goals
        } = req.body;


        const user = await User.findById(req.user.id).select("-password");
        if (!user)
            throw new ApiError(404, 'User not found', "USER_NOT_FOUND", "No user exists with the provided ID");


        if (height || weight) {
            user.bmi = weight / ((height / 100) ** 2);
            if (gender === 'male' || user.gender === 'male') {
                user.bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            }
            else if (gender === 'female' || user.gender === 'female') {
                user.bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
        }
        if (age) user.age = age;
        if (height) user.height = height;
        if (weight) user.weight = weight
        if (gender) user.gender = gender;

        if (dietaryPreferences) {
            user.dietaryPreferences.dietType = dietaryPreferences.dietType || user.dietaryPreferences.dietType;
            user.dietaryPreferences.allergies = dietaryPreferences.allergies || user.dietaryPreferences.allergies;
            user.dietaryPreferences.dislikes = dietaryPreferences.dislikes || user.dietaryPreferences.dislikes;
        }

        if (waterIntakeGoal) user.waterIntakeGoal = waterIntakeGoal;
        if (sleepGoal) user.sleepGoal = sleepGoal;

        if (goals) {
            user.goals.weightGoal = goals.weightGoal || user.goals.weightGoal;
            user.goals.activityLevel = goals.activityLevel || user.goals.activityLevel;
            user.goals.calorieGoal = goals.calorieGoal || user.goals.calorieGoal;
        }

        await user.save();


        res.status(200).json({
            success: true,
            message: 'User onboarding completed successfully',
            data: user
        });

        // TODO: Add logic to create default plans based on user preferences


    } catch (err) {
        if (err instanceof ApiError) {
            next(err);
        }
        if (err.name === 'ValidationError') {
            return next(new ApiError(400, "Validation Error", "VALIDATION_ERROR", err.message));
        }
        next(new ApiError(500, "Onboarding failed", "ONBOARDING_FAILED", err.message));
    }
};

export { OnboardUser };