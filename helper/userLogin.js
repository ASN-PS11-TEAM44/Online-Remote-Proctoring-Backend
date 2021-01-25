"use strict";

const sequelize = require("../models/index");
const { hash } = require("../utils/encryptDecrypt");

const { user } = sequelize.models;

const userLogin = async (email, password) => {
  const User = await user.findByPk(email, { raw: true });
  if (!User) return false;
  const hashedPassword = hash(password);
  return User.password === hashedPassword;
};

module.exports = { userLogin };
