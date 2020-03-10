const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Please Provide Name'
  },
  email: {
    type: String,
    required: "Please Provide Email"
  },
  password:{
      type: String,
      required: 'Please Provide Password'
  }
});

module.exports = mongoose.model("User", userSchema);
