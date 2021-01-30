"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("question", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
