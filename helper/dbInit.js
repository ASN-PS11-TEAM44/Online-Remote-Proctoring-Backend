"use strict";

const { examCreate } = require("./createExam");
const { associateExamStudent } = require("./associateExamStudent");
const { associateExamInvigilator } = require("./associateExamInvigilator");
const { questionCreate } = require("./createQuestion");
const { optionCreate } = require("./createOption");

const initDb = async () => {
  const currentDT = new Date();
  const nextYearDT = new Date();
  nextYearDT.setUTCFullYear(2022);

  await examCreate("First Exam", 100, currentDT, nextYearDT);
  await associateExamStudent(1, "siddharthsingharoy@gmail.com");
  await associateExamInvigilator(1, "siddharthsingharoy@teacher.com");

  await questionCreate("What is 1 + 1 ?", 1);
  await await optionCreate("3", false, 1);
  await optionCreate("5", false, 1);
  await optionCreate("32", false, 1);
  await optionCreate("2", true, 1);

  await questionCreate("Who is the President of India", 1);
  await optionCreate("Ram Nath Kovind", true, 2);
  await optionCreate("Joe Biden", false, 2);
  await optionCreate("Lionel Messi", false, 2);
  await optionCreate("India doesn't have a President", false, 2);

  await questionCreate("What is 4 x 6", 1);
  await optionCreate("42", false, 3);
  await optionCreate("24", true, 3);
  await optionCreate("54", false, 3);
  await optionCreate("23", false, 3);

  await questionCreate("What is solar eclipse ?", 1);
  await optionCreate(
    "A solar eclipse occurs when a portion of the Earth is engulfed in a shadow cast by the Moon which fully or partially blocks sunlight",
    true,
    4
  );
  await optionCreate(
    "A solar eclipse occurs when the Moon moves into the Earth's shadow. This can occur only when the Sun, Earth, and Moon are exactly or very closely aligned with Earth between the other two, and only on the night of a full moon.",
    false,
    4
  );

  await questionCreate("Who is the richest person in the world ?", 1);
  await optionCreate("Jeff Bezos", false, 5);
  await optionCreate("Jack Ma", false, 5);
  await optionCreate("Elon Musk", true, 5);
  await optionCreate("Bill Gates", false, 5);

  await questionCreate("What is 30 + 60 x 9", 1);
  await optionCreate("570", true, 6);
  await optionCreate("234", false, 6);
  await optionCreate("632", false, 6);
  await optionCreate("810", false, 6);

  await questionCreate("What is the full form of PDC ?", 1);
  await optionCreate("Possible Distributed Computing", false, 7);
  await optionCreate("Parallel Distributed Computing", true, 7);
  await optionCreate("Previous Distributed Computing", false, 7);
  await optionCreate("Proximity Distributed Computing", false, 7);

  await questionCreate("Which one of them is a scripting language ?", 1);
  await optionCreate("C", false, 8);
  await optionCreate("C++", false, 8);
  await optionCreate("Haskell", false, 8);
  await optionCreate("Python", true, 8);

  await questionCreate("Where did Covid-19 originate?", 1);
  await optionCreate("Spain", false, 9);
  await optionCreate("China", true, 9);
  await optionCreate("USA", false, 9);
  await optionCreate("Germany", false, 9);

  await questionCreate("What is a foreign key in DBMS ?", 1);
  await optionCreate(
    "A foreign key is a key used to link two tables together",
    true,
    10
  );
  await optionCreate(
    "A foreign key is a key in a relational database that is unique for each record.",
    false,
    10
  );
  await optionCreate(
    "A foreign key is a is a set of attributes such that each instance relation of the relation schema does not have two distinct tuples with the same values for these attributes",
    false,
    10
  );

  await questionCreate("Who is the Prime Minister of India", 1);
  await optionCreate("Narendra Modi", true, 11);
  await optionCreate("Amit Shah", false, 11);
  await optionCreate("Ram Nath Kovind", false, 11);
  await optionCreate("Donald Trump", false, 11);

  await questionCreate("Stack is a", 1);
  await optionCreate(
    "Stack is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal of entities from the other end of the sequence.",
    false,
    12
  );
  await optionCreate(
    "Stack is a linear data structure which follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out).",
    true,
    12
  );
  await optionCreate(
    "Stack is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence.",
    false,
    12
  );
};

initDb();
