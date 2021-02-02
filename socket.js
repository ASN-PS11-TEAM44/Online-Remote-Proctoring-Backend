const Keyv = require("keyv");
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const clientIO = require("socket.io-client");
const axios = require("axios");

const { whitelist } = require("./constants/whitelist");
const { generateToken } = require("./config/authConfig");
const { addUserActivity } = require("./helper/addUserActivity");
const { examSpecificFetch } = require("./helper/examSpecificFetch");
const { base64ToUrl } = require("./utils/base64ToUrl");

const client = clientIO.connect(process.env.AI_URL);
const keyv = new Keyv();
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
  socket.on("brightness validation", (imageSrc, callback) => {
    client.emit("brightness detector", imageSrc, (response) => {
      callback(response);
    });
  });

  socket.on("exam validation", (examId, userEmail, imageSrc, callback) => {
    client.emit("brightness detector", imageSrc, async (response) => {
      if (!response) {
        console.log("Low Brightness detected");
        // socket
        //   .in(userEmail)
        //   .emit({ message: "Low brightness in user's environment" });

        await addUserActivity(
          examId,
          userEmail,
          "Low brightness in user's environment",
          1
        );
        socket
          .in(userEmail)
          .emit({ message: "Low brightness in user's environment" });
        callback(true, "Low brightness in user's environment");
        const exam = await examSpecificFetch(examId);
        socket.in(exam.userEmail).emit("user report", {
          message: "Low brightness in user's environment",
        });
        return;
      } else {
        // client.emit("face detector", imageSrc, async (response, mssg) => {
        //   if (!response) {
        //     const exam = await examSpecificFetch(examId);
        //     const url = base64ToUrl(imageSrc);
        //     await addUserActivity(examId, userEmail, mssg, 2, url);
        //     const newMessage = `${userEmail} : ${mssg}`;
        //     socket
        //       .in(exam.userEmail)
        //       .emit("user report", { message: newMessage });
        //     socket
        //       .in(userEmail)
        //       .emit("user activity error message", { mssg: mssg });
        //   } else {
        client.emit("pose detector", imageSrc, async (response, mssg) => {
          if (!response) {
            const exam = await examSpecificFetch(examId);
            const url = base64ToUrl(imageSrc);
            await addUserActivity(examId, userEmail, mssg, 2, url);
            const newMessage = `${userEmail} : ${mssg}`;
            socket
              .in(exam.userEmail)
              .emit("user report", { message: newMessage });
            callback(true, mssg);
          } else {
            callback(false, "");
          }
          //   });
          // }
        });
      }
    });
    // client.emit("object detector", imageSrc, (response) => {
    //   // console.log(response);
    // });
  });
  socket.on("user activity", async (examId, userEmail, message, status) => {
    const exam = await examSpecificFetch(examId);
    await addUserActivity(examId, userEmail, message, status);
    const newMessage = `${userEmail} : ${message}`;
    socket.in(exam.userEmail).emit("user report", { message: newMessage });
  });
  socket.on("end test", (studentEmail) => {
    socket.in(studentEmail).emit("end test request");
  });
};

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: corsOptions,
  });
  io.on("connection", initSocket);
};
