"use strict";

const express = require("express");

const router = express.Router();

router.route("/verify").get((_req, res) => {
  res.send({ success: true });
});

module.exports = { router };
