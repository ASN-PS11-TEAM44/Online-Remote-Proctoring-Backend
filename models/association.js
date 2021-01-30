"use strict";

const applyExtraSetup = (sequelize) => {
  const {
    exam,
    user,
    question,
    option,
    testAttempt,
    // questionAttempt,
    // userActivity,
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

  //   questionAttempt.hasOne(testAttempt);
  //   testAttempt.hasMany(questionAttempt);
  //   questionAttempt.hasOne(question);
  //   question.hasMany(questionAttempt);
  //   questionAttempt.hasOne(option);
  //   option.hasMany(questionAttempt);

  //   userActivity.hasOne(testAttempt);
  //   testAttempt.belongsTo(userActivity);
  //   userActivity.hasOne(user);
  //   user.hasMany(userActivity);
};

module.exports = { applyExtraSetup };
