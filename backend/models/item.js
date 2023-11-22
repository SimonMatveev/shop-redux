const mongoose = require('mongoose');
const REG_EXP_URL = require('../utils/regexp');
const { CATEGORY_ENUM, PLATFORM_ENUM } = require('../utils/constants');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  studio: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceWithSale: {
    type: Number,
    required: true,
    default: function() {
      return this.price
    },
  },
  category: [{
    type: String,
    required: true,
    enum: CATEGORY_ENUM,
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
  releaseDate: {
    type: String,
    reqired: true,
  },
  platforms: [{
    type: String,
    enum: PLATFORM_ENUM,
    required: true,
  }],
  series: {
    type: String,
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
