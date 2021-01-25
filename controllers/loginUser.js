"use strict";

const { userLogin } = require("../helper/userLogin");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      error: "Email Address cannot be empty",
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
  const response = await userLogin(email, password);
  if (response) {
    res.status(200).send({
      error: "Email and Password valid",
    });
  } else {
    res.status(400).send({
      error: "Invalid email and password combination",
    });
  }
  return;
};
module.exports = { loginController };
