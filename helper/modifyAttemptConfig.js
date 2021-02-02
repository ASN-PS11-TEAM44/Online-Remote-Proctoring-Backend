"use strict";
const sequelize = require("../models/index");

const { testAttempt, exam } = sequelize.models;

const validateConfig = async (examId, obj) => {
  const examInfo = await exam.findOne({
    where: {
      id: examId,
    },
  });
  if (
    examInfo.tabSwitchCount < obj.tabSwitchCount &&
    examInfo.tabSwitchCount !== 0 &&
    !examInfo.allowTabSwitch
  ) {
    return true;
  }
  if (
    examInfo.browserSwitchCount < obj.browserSwitchCount &&
    examInfo.browserSwitchCount !== 0 &&
    !examInfo.allowBrowserSizeChange
  ) {
    return true;
  }
  if (
    examInfo.headMovementCount < obj.headMovementCount &&
    examInfo.headMovementCount !== 0 &&
    !examInfo.allowHeadMovement
  ) {
    return true;
  }
  if (
    examInfo.brighnessDimCount < obj.brighnessDimCount &&
    examInfo.brighnessDimCount !== 0 &&
    !examInfo.allowBrightnessDim
  ) {
    return true;
  }
  return false;
};

const modifyAttemptConfig = async (
  examId,
  userEmail,
  tabSwitchCount = 0,
  browserSwitchCount = 0,
  headMovementCount = 0,
  brighnessDimCount = 0
) => {
  const obj = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
  });
  obj.tabSwitchCount = parseInt(obj.tabSwitchCount) + tabSwitchCount;
  obj.browserSwitchCount =
    parseInt(obj.browserSwitchCount) + browserSwitchCount;
  obj.headMovementCount = parseInt(obj.headMovementCount) + headMovementCount;
  obj.brighnessDimCount = parseInt(obj.brighnessDimCount) + brighnessDimCount;
  const newObj = await obj.save();
  return await validateConfig(examId, newObj);
};

module.exports = { modifyAttemptConfig };
