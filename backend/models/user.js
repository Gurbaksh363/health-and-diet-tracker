import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    hasCompletedOnboarding: {
        type: Boolean,
        default: false,
    },

    // Personal details
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },

    // Health preferences
    bmi: {
        type: Number,
    },
    bmr: {
        type: Number,
    },
    medicalConditions: {
        type: [String],
    },
    targetWeight: {
        type: Number,
    },

    // Dietary preferences
    dietaryPreferences: {
        dietType: {
            type: String,
            enum: ['vegetarian', 'vegan', 'pescatarian', 'keto', 'gluten-free', 'kosher', 'non-vegetarian'],
        },
        allergies: {
            type: [String],
        },
        dislikes: {
            type: [String],
        }
    },

    // Lifestyle and daily goals
    waterIntakeGoal: {
        type: Number,
    },
    sleepGoal: {
        type: Number,
    },
    stepsGoal: {
        type: Number,
    },

    // Fitness and activity goals
    goals: {
        weightGoal: {
            type: Number,
        },
        activityLevel: {
            type: String,
            enum: ['sedentary', 'lightly active', 'moderately active', 'very active', 'extra active']
        },
        calorieGoal: {
            type: Number,
        }
    },

    //AI generated plans
    customPlan: {
        dailyRoutine: {
            type: String
        },
        mealPlan: {
            breakfast: { type: String },
            lunch: { type: String },
            dinner: { type: String },
            snacks: { type: String },
        },
        weeklyHabits: {
            type: [String]
        },
        tips: {
            type: String
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;