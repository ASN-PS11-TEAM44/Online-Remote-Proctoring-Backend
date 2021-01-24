"use strict";

const { Socket } = require("dgram");
const { app } = require("./app");
const server = require("http").createServer(app);

// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Read the port from the environment file
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.info(`Server listening on Port ${PORT}`));

io.on("connection", (socket) => {});
