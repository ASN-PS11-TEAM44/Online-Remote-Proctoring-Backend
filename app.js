"use strict";

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const { whitelist } = require("./constants/whitelist");
const { sanitiseInput } = require("./utils/sanitise");
const { logger } = require("./logger");
const { router: authRouter } = require("./routes/authentication/router");
const { router: sampleRouter } = require("./routes/sample/router");
const { router: examRouter } = require("./routes/exam/router");
const passport = require("./config/passportConfig");
// const { addUserActivity } = require("./helper/addUserActivity");
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

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, _res, next) => {
  req.body = sanitiseInput(req.body);
  next();
});

app.use("/auth", authRouter);
app.use("/api", passport.authenticate("jwt", { session: false }));
app.use("/api/jwt", sampleRouter);
app.use("/api/exam", examRouter);

app.use(function (err, _req, res, _next) {
  logger.error(err);
  res.status(500).send({ success: false, error: "Oops: Something broke!" });
});

module.exports = {
  app,
};
