const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true, // Assuming userId should be unique
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false, // Set the default value to false
  },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema); // Use a singular model name like 'User'

module.exports = userModel;
