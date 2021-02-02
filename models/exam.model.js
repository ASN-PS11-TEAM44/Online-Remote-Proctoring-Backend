"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("exam", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    allowTabSwitch: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tabSwitchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    allowBrowserSizeChange: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    browserSwitchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    allowBrightnessDim: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    brighnessDimCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    allowHeadMovement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    headMovementCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    allowVoice: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
