"use strict";

const express = require("express");
const { examFetchController } = require("../../controllers/getExam");
const {
  examDetailFetchController,
} = require("../../controllers/getExamDetails");
const { questionFetchController } = require("../../controllers/getQuestions");
const { attemptExamController } = require("../../controllers/attemptExam");
const { getAttemptController } = require("../../controllers/getAttempt");
const router = express.Router();

router.route("/").get(examFetchController);
router.route("/question").post(questionFetchController);
router.route("/details").post(examDetailFetchController);
router.route("/attempt").post(attemptExamController);
router.route("/fetch/attempt").post(getAttemptController);

module.exports = { router };
