const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    // Check if a user with the provided userId, password, and verified status exists
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });

    if (user) {
      res.send(user)
      // User exists and is verified
     
    } else {
      // User not found or not verified
      res.status(401).json({ message: 'Login Failed', error: 'Invalid credentials or unverified user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login Failed', error: error.message });
  }
});

// POST route for user registration
router.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel({...req.body , verified : false});
    await newUser.save();
    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Registration Failed', error: error.message });
  }
});

module.exports = router;
