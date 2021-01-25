"use strict";

const path = require("path");
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const { userRegister } = require("../../helper/userRegister");
const { ImageMimeTypes } = require("../../constants/ImageMimeTypes");
const { registerController } = require("../../controllers/registerUser");
const { loginController } = require("../../controllers/loginUser");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve(__dirname, "../", "../", "upload"));
  },
  filename: (_req, file, cb) => {
    const fileName = "".concat(uuidv4(), file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    cb(null, ImageMimeTypes.includes(file.mimetype));
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

router.route("/register").post(upload.single("image"), registerController);
router.route("/login").post(loginController);

module.exports = { router };
