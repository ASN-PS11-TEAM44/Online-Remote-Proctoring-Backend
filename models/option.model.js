"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("option", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
