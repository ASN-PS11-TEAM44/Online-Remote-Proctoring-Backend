"use strict";

const applyExtraSetup = (sequelize) => {
  const {
    exam,
    user,
    question,
    option,
    testAttempt,
    questionAttempt,
    userActivity,
  } = sequelize.models;
  exam.belongsToMany(user, { through: "student_in_exam" });
  exam.hasOne(user, { as: "invigilatorID", constraints: false });
  user.hasMany(exam, { as: "invigilatorID", constraints: false });
  user.belongsToMany(exam, { through: "student_in_exam" });

  exam.hasMany(question);
  question.belongsTo(exam);

  question.hasMany(option);
  option.belongsTo(question);

  exam.hasMany(testAttempt);
  testAttempt.hasOne(exam, { constraints: false });
  user.hasMany(testAttempt, { constraints: false });
  testAttempt.hasOne(user);

  questionAttempt.hasOne(testAttempt, { constraints: false });
  testAttempt.hasMany(questionAttempt);
  questionAttempt.hasOne(question, { constraints: false });
  question.hasMany(questionAttempt);
  questionAttempt.hasOne(option, { constraints: false });
  option.hasMany(questionAttempt);

  testAttempt.hasOne(userActivity, { constraints: false });
  userActivity.belongsTo(testAttempt);
  userActivity.hasOne(user);
  user.hasMany(userActivity, { constraints: false });
};

module.exports = { applyExtraSetup };
