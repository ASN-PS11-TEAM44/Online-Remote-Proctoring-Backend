"use strict";

const sequelize = require("../models/index");

const { user } = sequelize.models;

const userRegister = async (email, password, url) => {
  await user.create({ email, password, url });
};

module.exports = { userRegister };
