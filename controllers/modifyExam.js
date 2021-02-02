"use strict";

const { modifyExamConfig } = require("../helper/modifyExamConfig");

const modifyExamController = async (req, res) => {
  const {
    examId,
    allowBrightnessDim,
    allowHeadMovement,
    allowVoice,
    allowBrowserSizeChange,
    allowTabSwitch,
    headMovementCount,
    tabSwitchCount,
    browserSwitchCount,
    brighnessDimCount,
  } = req.body;
  await modifyExamConfig(
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
  );
  res.send({ success: true });
};
module.exports = { modifyExamController };
