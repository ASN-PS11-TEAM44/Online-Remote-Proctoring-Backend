"use strict";

const sequelize = require("../models/index");

const { exam } = sequelize.models;

const modifyExamConfig = async (
  examId,
  allowBrightnessDim,
  allowHeadMovement,
  allowVoice,
  allowBrowserSizeChange,
  allowTabSwitch,
  headMovementCount,
  tabSwitchCount,
  browserSwitchCount,
  brighnessDimCount
) => {
  const examInfo = await exam.findOne({
    where: {
      id: examId,
    },
  });
  examInfo.allowTabSwitch = allowTabSwitch;
  examInfo.tabSwitchCount = tabSwitchCount;
  examInfo.allowBrowserSizeChange = allowBrowserSizeChange;
  examInfo.browserSwitchCount = browserSwitchCount;
  examInfo.allowBrightnessDim = allowBrightnessDim;
  examInfo.brighnessDimCount = brighnessDimCount;
  examInfo.allowHeadMovement = allowHeadMovement;
  examInfo.headMovementCount = headMovementCount;
  examInfo.allowVoice = allowVoice;
  await examInfo.save();
  return examInfo;
};

module.exports = { modifyExamConfig };
