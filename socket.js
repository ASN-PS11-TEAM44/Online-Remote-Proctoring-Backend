const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const clientIO = require("socket.io-client");
const axios = require("axios");

const { whitelist } = require("./constants/whitelist");
const { generateToken } = require("./config/authConfig");

const client = clientIO.connect(process.env.AI_URL);
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

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
const initSocket = (socket) => {
  socket.on(
    "login verification",
    async (email, imageSrc, urlImage, callback) => {
      const image = await axios.get(urlImage, {
        responseType: "arraybuffer",
      });
      const dbImage = Buffer.from(image.data).toString("base64");
      client.emit("face verification", imageSrc, dbImage, (response) => {
        generateToken(email)
          .then((token) => {
            callback(response, token);
          })
          .catch(() => {});
      });
    }
  );
  socket.on("brightness validation", async (imageSrc, callback) => {
    client.emit("brightness detector", imageSrc, (response) => {
      callback(response);
    });
  });
};

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: corsOptions,
  });
  io.on("connection", initSocket);
};
