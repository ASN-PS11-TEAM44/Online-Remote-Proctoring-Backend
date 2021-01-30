"use strict";

const express = require("express");
const { examFetchController } = require("../../controllers/getExam");
const {
  examDetailFetchController,
} = require("../../controllers/getExamDetails");
const { questionFetchController } = require("../../controllers/getQuestions");
const { attemptExamController } = require("../../controllers/attemptExam");
const { getAttemptController } = require("../../controllers/getAttempt");
const {
  attemptQuestionController,
} = require("../../controllers/attemptQuestion");
const { answerFetchController } = require("../../controllers/getAnswers");
const { endExamController } = require("../../controllers/endExam");
const router = express.Router();

router.route("/").get(examFetchController);
router.route("/question").post(questionFetchController);
router.route("/details").post(examDetailFetchController);
router.route("/attempt").post(attemptExamController);
router.route("/fetch/attempt").post(getAttemptController);
router.route("/answer").post(attemptQuestionController);
router.route("/fetch/answer").post(answerFetchController);
router.route("/end").post(endExamController);

module.exports = { router };
