"use strict";

const { hash } = require("../utils/encryptDecrypt");
const { userFetch } = require("./userFetch");

const userLogin = async (email, password) => {
  const User = await userFetch(email);
  if (!User) return [false, null];
  const hashedPassword = hash(password);
  return [User.password === hashedPassword, User];
};

module.exports = { userLogin };
