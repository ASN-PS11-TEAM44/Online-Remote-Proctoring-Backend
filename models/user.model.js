"use strict";

const { DataTypes } = require("sequelize");
const { hash } = require("../utils/encryptDecrypt");

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

module.exports = (sequelize) => {
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hash(value));
      },
      validate: {
        is: /^\w{6,}$/,
      },
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      set(value) {
        if (process.env.NODE_ENV !== "production") {
          const url = `http://localhost:${process.env.PORT}${value}`;
          this.setDataValue("url", url);
        } else {
          this.setDataValue("url", value);
        }
      },
    },
    isStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
