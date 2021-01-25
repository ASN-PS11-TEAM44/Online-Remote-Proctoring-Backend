"use strict";

const { ValidationError } = require("sequelize");
const validator = require("validator").default;
const { userRegister } = require("../helper/userRegister");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      error: "Email Address cannot be empty",
    });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).send({
      error: "Not a valid email address",
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      error: "Password cannot be empty",
    });
    return;
  }
  if (password.length < 6) {
    res.status(400).send({
      error: "Minimum length for password is 6",
    });
    return;
  }
  if (!req.file) {
    res.status(400).send({
      error: "No file has been selected or file doesn't have proper extension",
    });
    return;
  }
  const imagePath = "/upload/" + req.file.filename;
  try {
    await userRegister(email, password, imagePath);
    res
      .status(201)
      .send({ success: true, mssg: "User registered successfully" });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send({
        success: false,
        error: "Email address already registered",
      });
    }
  }
};
module.exports = { registerController };
