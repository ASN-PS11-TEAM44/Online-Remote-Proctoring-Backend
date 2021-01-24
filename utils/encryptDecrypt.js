"use strict";

const CryptoJS = require("crypto-js");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "random@123";

const encrypt = (text) => CryptoJS.AES.encrypt(text, secretKey).toString();

const decrypt = (text) =>
  CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);

const hash = CryptoJS.SHA3("Message", { outputLength: 256 });

module.exports = {
  encrypt,
  decrypt,
  hash,
};
