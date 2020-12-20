const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Please Provide Username',
    unique: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: 'Please Provide Password'
  }
});

module.exports = mongoose.model("User", userSchema);
