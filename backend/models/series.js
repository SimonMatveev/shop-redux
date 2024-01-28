const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('series', seriesSchema);
