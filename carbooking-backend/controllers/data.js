// const axios = require("axios");
// const CONFIGS = require("../configs");
const City = require("../model/cities");
const Driver = require("../model/drivers");

exports.searchPlace = async (req, res, next) => {
  const searchkey = req.query.searchkey;

  try {
    await City.find({}, "name");
    places = await City.find({ name: { $regex: searchkey, $options: "i" } });
  } catch (err) {
    next(err);
  }

  res.send({
    places
  });
};

exports.getDrivers = async (req, res, next) => {
  let drivers;
  try {
    drivers = await Driver.find();
  } catch (err) {
    next(err);
  }
  res.send({
    drivers
  });
};
