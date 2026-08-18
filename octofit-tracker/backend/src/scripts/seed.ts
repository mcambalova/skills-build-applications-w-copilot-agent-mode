import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', username: 'mayachen', email: 'maya@example.com' },
      { name: 'Jordan Lee', username: 'jordanlee', email: 'jordan@example.com' },
      { name: 'Sam Rivera', username: 'samrivera', email: 'sam@example.com' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Summit Sprinters', description: 'A team focused on consistent progress.' },
      { name: 'Trail Blazers', description: 'Outdoor training and weekend challenges.' },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id.toString(), teamId: teams[0]._id.toString(), activity: 'Running', points: 420 },
      { userId: users[1]._id.toString(), teamId: teams[0]._id.toString(), activity: 'Cycling', points: 360 },
      { userId: users[2]._id.toString(), teamId: teams[1]._id.toString(), activity: 'Strength training', points: 290 },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), username: users[0].username, points: 420, rank: 1 },
      { userId: users[1]._id.toString(), username: users[1].username, points: 360, rank: 2 },
      { userId: users[2]._id.toString(), username: users[2].username, points: 290, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'Progressive 5K', description: 'A three-week running plan for building endurance.', activity: 'Running', durationMinutes: 35, difficulty: 'Beginner' },
      { name: 'Full-body foundation', description: 'A balanced strength session using bodyweight movements.', activity: 'Strength training', durationMinutes: 30, difficulty: 'Intermediate' },
      { name: 'Hill climb intervals', description: 'Short cycling intervals to improve power and stamina.', activity: 'Cycling', durationMinutes: 45, difficulty: 'Advanced' },
    ]);

    console.log(`Database seeding complete: ${users.length} users, ${teams.length} teams, ${activities.length} activities, 3 leaderboard entries, and 3 workouts.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
