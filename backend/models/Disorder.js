const mongoose = require('mongoose');

const disorderSchema = new mongoose.Schema({
  user: {
    type: String, // Assuming the user's email is stored as a string
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  severity: {
    type: Number,
    default: 0,
  },
  diagnosisDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Disorder', disorderSchema);