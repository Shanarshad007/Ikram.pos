const express = require('express');
const router = express.Router();
const billModel = require('../models/billModel');

// Route to charge a bill
router.post('/charge-bill', async (req, res) => {
  try {
    const newBill = new billModel(req.body);
    await newBill.save();
    res.status(201).json({ message: 'Bill Charged Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Route to get all bills
router.get('/get-all-bills', async (req, res) => {
  try {
    const bills = await billModel.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;

