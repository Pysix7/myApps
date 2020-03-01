const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    text:true
  },
  state: {
    type: String,
    required: true,
    text:true
  }
});

citySchema.index({
  name: "text"
});

module.exports = mongoose.model("City", citySchema);
