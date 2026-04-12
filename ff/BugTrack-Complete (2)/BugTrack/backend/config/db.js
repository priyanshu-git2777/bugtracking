const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI not found in .env file!');
    process.exit(1);
  }

  console.log('🔄 Connecting to MongoDB...');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('   Reason:', error.message);
    console.error('');
    console.error('🔧 FIXES:');
    console.error('   1. Make sure mongod is running (see README.md)');
    console.error('   2. Check your MONGO_URI in backend/.env');
    console.error('   3. For Atlas: whitelist IP 0.0.0.0/0 in Network Access');
    process.exit(1);
  }
};

module.exports = connectDB;
