"use strict";

const { attemptFetch } = require("../helper/attemptFetch");

const getAttemptController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;
  const attempt = await attemptFetch(examId, userEmail);
  res.send({ attempt: attempt });
};
module.exports = { getAttemptController };
