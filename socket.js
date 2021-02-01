const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const clientIO = require("socket.io-client");
const axios = require("axios");

const { whitelist } = require("./constants/whitelist");
const { generateToken } = require("./config/authConfig");
const { addUserActivity } = require("./helper/addUserActivity");
const { examSpecificFetch } = require("./helper/examSpecificFetch");

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
      socket.join(email);
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
  socket.on("connect to room", (email) => {
    socket.join(email);
  });
  socket.on("brightness validation", async (imageSrc, callback) => {
    client.emit("brightness detector", imageSrc, (response) => {
      callback(response);
    });
  });

  socket.on("exam validation", async (imageSrc) => {
    client.emit("face detector", imageSrc, (response, mssg) => {
      // console.log(response, mssg);
    });
    client.emit("object detector", imageSrc, (response) => {
      // console.log(response);
    });
    client.emit("pose detector", imageSrc, (response, mssg) => {
      // console.log(response, mssg);
    });
  });
  socket.on("user activity", async (examId, userEmail, message, status) => {
    const exam = await examSpecificFetch(examId);
    await addUserActivity(examId, userEmail, message, status);
    console.log(socket.rooms);
    const newMessage = `${userEmail} : ${message}`;
    socket.in(exam.userEmail).emit("user report", { message: newMessage });
  });
};

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: corsOptions,
  });
  io.on("connection", initSocket);
};
