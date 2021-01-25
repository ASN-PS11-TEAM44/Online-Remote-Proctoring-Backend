"use strict";

const sequelize = require("../models/index");
const { hash } = require("../utils/encryptDecrypt");
const { userFetch } = require("./userFetch");

const { user } = sequelize.models;

const userLogin = async (email, password) => {
  const User = await userFetch(email);
  if (!User) return false;
  const hashedPassword = hash(password);
  return User.password === hashedPassword;
};

module.exports = { userLogin };
