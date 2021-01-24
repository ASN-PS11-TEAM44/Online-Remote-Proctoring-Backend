"use strict";

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const { whitelist } = require("./constants/whitelist");
const { sanitiseInput } = require("./utils/sanitise");
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow Rest API Clients to be used for testing
    if (
      whitelist.indexOf(origin) !== -1 ||
      process.env.NODE_ENV !== "production"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, _res, next) => {
  req.body = sanitiseInput(req.body);
  next();
});

app.use(function (err, _req, res, _next) {
  res.status(500).send({ error: "Oops: Something broke!" });
});

module.exports = {
  app,
};