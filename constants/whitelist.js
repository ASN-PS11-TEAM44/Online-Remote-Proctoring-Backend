"use strict";

// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const whitelist = [process.env.FRONTEND_URL];

module.exports = { whitelist };
