"use strict";

const { Socket } = require("dgram");
const { app } = require("./app");
const server = require("http").createServer(app);
const { logger } = require("./logger");
const sequelize = require("./models/index");
const { whitelist } = require("./constants/whitelist");

const corsOptions = {
  origin: function (origin, callback) {
    // Allow Rest API Clients to be used for testing
    if (
      whitelist.indexOf(origin) !== -1 ||
      process.env.NODE_ENV !== "production"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const io = require("socket.io")(server, {
  cors: corsOptions,
});

// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const assertDatabaseConnectionOk = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected");
    sequelize.sync();
  } catch (error) {
    logger.error("Unable to connect to the database:");
    logger.error(error.message);
    process.exit(1);
  }
};

assertDatabaseConnectionOk();

// Read the port from the environment file
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => logger.info(`Server listening on Port ${PORT}`));

io.on("connection", (socket) => {
  socket.on("login verification", (email, imageSrc) => {
    console.log(email);
  });
});
