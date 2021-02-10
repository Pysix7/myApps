// read env file
require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3333,
  JWT_SECRET: process.env.JWT_SECRET || "veryverysecretkey",
  JWT_EXPIRE: process.env.JWT_EXPIRE || 1,
  // MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/chatServer',
  MONGO_URI: process.env.MONGO_URI,
};
