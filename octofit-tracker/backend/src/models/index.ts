import mongoose, { Schema } from 'mongoose';

const flexibleSchema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    description: { type: String },
    userId: { type: String },
    teamId: { type: String },
    activity: { type: String },
    points: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false },
);

export const User = mongoose.models.User || mongoose.model('User', flexibleSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', flexibleSchema, 'teams');
export const Activity = mongoose.models.Activity || mongoose.model('Activity', flexibleSchema, 'activities');
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', flexibleSchema, 'leaderboard');
export const Workout = mongoose.models.Workout || mongoose.model('Workout', flexibleSchema, 'workouts');