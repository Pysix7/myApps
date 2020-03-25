// const axios = require("axios");
// const CONFIGS = require("../configs");
const City = require("../model/cities");
// const axiosInstance = axios.create();
const Driver = require("../model/drivers");
// const Client = require("@googlemaps/google-maps-services-js").Client;

exports.searchPlace = async (req, res, next) => {
  const searchkey = req.query.searchkey;

  let places = [];
  try {
    // const client = new Client({});
    // client
    //   .placeAutocomplete({
    //     params: {
    //       input: searchkey,
    //       locations: [{ lat: 21, lng: 78 }],
    //       key: "AIzaSyDIODzLUpixyTafJIwLL8VqGPMmXd6CnLo"
    //     },
    //     timeout: 1000 // milliseconds
    //   })
    //   .then(r => {
    //     places = r.data.results;
    //     console.log(r);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

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
