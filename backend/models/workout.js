import mongoose from 'mongoose';
const { Schema } = mongoose;

const workoutSchema = new Schema({
  // User reference
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Workout details
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'sports'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  intensity: {
    type: String,
    enum: ['light', 'moderate', 'high'],
    required: true
  },
  calories: {
    type: Number,
    required: true
  },

  // Optional details
  distance: {
    value: Number,
    unit: { type: String, enum: ['km', 'mi'], default: 'km' }
  },
  notes: String,
  
  // Date & time
  date: {
    type: Date,
    required: true,
    index: true
  },
  time: String, // HH:mm format

  // Tracking
  source: {
    type: String,
    enum: ['manual', 'google-fit', 'apple-health'],
    default: 'manual'
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for faster queries
workoutSchema.index({ userId: 1, date: 1 });
workoutSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Workout', workoutSchema);
