const express = require('express');
const router = express.Router();
const ItemModel = require('../models/itemsModel'); // Assuming the path to your Mongoose model is correct

// GET route to fetch all items
router.get('/get-all-items', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/add-item', async (req, res) => {
  try {
    const newitem = new ItemModel(req.body);
    await newitem.save()
    res.send('Item added Successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/edit-item', async (req, res) => {
  try {
    await ItemModel.findOneAndUpdate({_id : req.body.itemId} , req.body)
    res.send('Item Updated Successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/delete-item', async (req, res) => {
  try {
    await ItemModel.findOneAndDelete({_id : req.body.itemId})
    res.send('Item deleted Successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST route to create a new item


module.exports = router;
