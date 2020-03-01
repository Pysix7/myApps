const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  charge: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Driver", driverSchema);
