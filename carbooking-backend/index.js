const express = require("express");
const CONFIGS = require("./configs");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const jwt = require("jsonwebtoken");

const City = require("./model/cities");
const cityData = require("./files/cities");
const Driver = require("./model/drivers");
const driverData = require("./files/drivers");

const appRoutes = require("./routes/data");
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");

const srvr = express();

const mongoDBURI = "mongodb://localhost/instacar";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
srvr.use(limiter);
srvr.use(bodyParser.json());

srvr.use((req, res, next) => {
  const authorizationHeader =
    req.headers && req.headers.authorization
      ? req.headers.authorization.split(" ")
      : null;

  if (authorizationHeader && authorizationHeader[0] === "Bearer") {
    const validToken = jwt.verify(authorizationHeader[1], CONFIGS.JWT_SECRET);
    console.log("validToken :", validToken);
  }
  next();
});

srvr.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
srvr.use("/status", (req, res, next) => {
  res.send({
    status: "active"
  });
});

srvr.use("/data", appRoutes);
srvr.use("/auth", authRoutes);
srvr.use("/trip", tripRoutes);

srvr.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const Data = cityData.map(item => {
      return {
        name: item.name,
        state: item.state,
        distance: item.distance
      };
    });

    //seed cities data
    City.find()
      .then(resp => {
        if (resp && resp.length === 0) {
          City.insertMany(Data).then(resp => {
            console.log("inserted cities :", resp.length);
          });
        }
      })
      .catch(err => {
        console.log("err :", err);
      });
    // seed driveer data

    Driver.find()
      .then(drivers => {
        if (drivers && drivers.length === 0) {
          Driver.insertMany(driverData).then(resp => {
            console.log("inserted drivers :", resp.length);
          });
        }
      })
      .catch(err => console.log("err :", err));

    srvr.listen(CONFIGS.PORT, () =>
      console.log(`listening on port :: ${CONFIGS.PORT}`)
    );
  })
  .catch(err => {
    console.log("err :", err);
  });
