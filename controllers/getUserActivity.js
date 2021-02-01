"use strict";

const { getUserActivity } = require("../helper/getUserActivity");

const userActivityFetchController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;
  const studentEmail = req.body.studentEmail;

  const activity = await getUserActivity(examId, studentEmail);
  res.send({ activity: activity });
};
module.exports = { userActivityFetchController };
