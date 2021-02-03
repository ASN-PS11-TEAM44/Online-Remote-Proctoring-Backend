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
const { modifyAttemptConfig } = require("./helper/modifyAttemptConfig");
const { userFetch } = require("./helper/userFetch");

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

const users = {};

const socketToRoom = {};

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */

// const initSocket =

const initIOConnection = (server) => {
  const io = require("socket.io")(server, {
    cors: corsOptions,
  });
  io.on("connection", (socket) => {
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
    socket.on("join vc room", (examId) => {
      const roomID = examId;
      if (users[roomID]) {
        users[roomID].push(socket.id);
      } else {
        users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
      }
    });

    socket.on("brightness validation", (imageSrc, callback) => {
      client.emit("brightness detector", imageSrc, (response) => {
        callback(response);
      });
    });

    socket.on(
      "exam validation",
      async (examId, userEmail, imageSrc, callback) => {
        const exam = await examSpecificFetch(examId);
        if (exam.allowBrightnessDim) {
          callback(false, "");
          return;
        }
        client.emit("brightness detector", imageSrc, async (response) => {
          if (!response) {
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
            const isValid = await modifyAttemptConfig(
              examId,
              userEmail,
              0,
              0,
              0,
              1
            );
            callback(true, "Low brightness in user's environment", isValid);

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
            if (exam.allowHeadMovement) {
              callback(false, "");
              return;
            }
            client.emit("pose detector", imageSrc, async (response, mssg) => {
              if (!response) {
                const exam = await examSpecificFetch(examId);
                const url = base64ToUrl(imageSrc);
                await addUserActivity(examId, userEmail, mssg, 2, url);
                const newMessage = `${userEmail} : ${mssg}`;
                socket
                  .in(exam.userEmail)
                  .emit("user report", { message: newMessage });
                const isValid = await modifyAttemptConfig(
                  examId,
                  userEmail,
                  0,
                  0,
                  1,
                  0
                );
                callback(true, mssg, isValid);
              } else {
                // Run face recognition
                console.log("Going to run facial recognition");
                const user = await userFetch(userEmail);
                const image = await axios.get(user.url, {
                  responseType: "arraybuffer",
                });
                const dbImage = Buffer.from(image.data).toString("base64");
                client.emit(
                  "face verification",
                  imageSrc,
                  dbImage,
                  async (re) => {
                    if (!re) {
                      console.log(
                        "Going to end test due to facial recognition"
                      );
                      const exam = await examSpecificFetch(examId);
                      const url = base64ToUrl(imageSrc);
                      await addUserActivity(
                        examId,
                        userEmail,
                        "Another person might be taking the test",
                        2,
                        url
                      );
                      const newMessage = `${userEmail} : Another person might be taking the test`;
                      socket
                        .in(exam.userEmail)
                        .emit("user report", { message: newMessage });
                      callback(
                        true,
                        "Another person might be taking the test",
                        true
                      );
                    } else {
                      callback(false, "");
                    }
                  }
                );
              }
              //   });
              // }
            });
          }
        });
        // client.emit("object detector", imageSrc, (response) => {
        //   // console.log(response);
        // });
      }
    );
    socket.on(
      "user activity",
      async (examId, userEmail, message, status, type, callback) => {
        const exam = await examSpecificFetch(examId);
        await addUserActivity(examId, userEmail, message, status);
        const newMessage = `${userEmail} : ${message}`;
        socket.in(exam.userEmail).emit("user report", { message: newMessage });
        const isValid = await modifyAttemptConfig(
          examId,
          userEmail,
          type === "tab" ? 1 : 0,
          type === "size" ? 1 : 0,
          0,
          0
        );
        callback(isValid);
      }
    );
    socket.on("end test", (studentEmail) => {
      socket.in(studentEmail).emit("end test request");
    });
  });
};

module.exports = (server) => {
  initIOConnection(server);
};
