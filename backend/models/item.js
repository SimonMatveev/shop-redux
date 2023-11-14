const mongoose = require('mongoose');
const REG_EXP_URL = require('../utils/regexp');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceWithSale: {
    type: Number,
  },
  category: [{
    type: String,
    required: true,
  }],
  rating: {
    type: Number,
    required: true,
    default: -1,
  },
  inStockAmount: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
    },
  }],
});

module.exports = mongoose.model('item', itemSchema);
