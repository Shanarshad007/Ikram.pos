const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhoneNumber: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number, // Change type to Number for totalAmount
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  cartitems: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

const billModel = mongoose.model("bills", billSchema);

module.exports = billModel;
