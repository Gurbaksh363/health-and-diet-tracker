const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutPreferencesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    daysPerWeek: {
        type: Number
    },
    workoutIntensity: {
        type: String,
        enum: ['light', 'moderate', 'intense']
    },
    preferredDays: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPreferences', workoutPreferencesSchema);