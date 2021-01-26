"use strict";

const { app } = require("./app");
const initSocket = require("./socket");
const { logger } = require("./logger");
const sequelize = require("./models/index");
const { assertDatabaseConnectionOk } = require("./helper/validateDb");

// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const server = require("http").createServer(app);
initSocket(server);
assertDatabaseConnectionOk();

// Read the port from the environment file
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => logger.info(`Server listening on Port ${PORT}`));
