"use strict";

const sequelize = require("../models/index");

const { user } = sequelize.models;

const userFetch = async (email) => {
  const User = await user.findByPk(email, { raw: true });
  return User;
};

module.exports = { userFetch };
