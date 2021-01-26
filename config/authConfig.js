"use strict";

const jwt = require("jsonwebtoken");

const authConfig = {
  expiresIn: "1 day",
  algorithm: "HS256",
};

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const secretKey = process.env.SECRET_KEY || "randomKey@123";
const options = {
  algorithm: authConfig.algorithm,
  expiresIn: authConfig.expiresIn,
};

const generateToken = async (email) => {
  const result = await new Promise((resolve, reject) => {
    jwt.sign({ email: email }, secretKey, options, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
  return result;
};

module.exports = {
  generateToken,
  authConfig,
};
