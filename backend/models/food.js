import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: {
      type: Number,
      default: 0,
      min: 0,
    },
    carbs: {
      type: Number,
      default: 0,
      min: 0,
    },
    fats: {
      type: Number,
      default: 0,
      min: 0,
    },
    servingSize: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0.1,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    time: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
foodSchema.index({ userId: 1, date: -1 });

const Food = mongoose.model('Food', foodSchema);

export default Food;
