const mongoose = require('mongoose');

const disorderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dateDiagnosed: {
    type: Date,
    required: true,
  },
  intensityLogs: [{
    date: {
      type: Date,
      required: true,
    },
    intensity: {
      type: Number,
      default: 0,
    },
  }],
});

const Disorder = mongoose.model('Disorder', disorderSchema);

module.exports = Disorder;
