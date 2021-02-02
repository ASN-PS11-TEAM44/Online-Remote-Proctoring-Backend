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
const {
  userActivityFetchController,
} = require("../../controllers/getUserActivity");
const { userFetchController } = require("../../controllers/getUsers");
const { modifyExamController } = require("../../controllers/modifyExam");

const router = express.Router();

router.route("/").post(examFetchController);
router.route("/question").post(questionFetchController);
router.route("/details").post(examDetailFetchController);
router.route("/attempt").post(attemptExamController);
router.route("/fetch/attempt").post(getAttemptController);
router.route("/answer").post(attemptQuestionController);
router.route("/fetch/answer").post(answerFetchController);
router.route("/end").post(endExamController);
router.route("/fetch/activity").post(userActivityFetchController);
router.route("/users").post(userFetchController);
router.route("/modify").post(modifyExamController);

module.exports = { router };
