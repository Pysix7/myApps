const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Please Provide Username'
  },
  email: {
    type: String,
    // required: "Please Provide Email"
  },
  password:{
      type: String,
      required: 'Please Provide Password'
  }
});

module.exports = mongoose.model("User", userSchema);
