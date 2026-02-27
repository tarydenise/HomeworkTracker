const { body } = require("express-validator");

const assignmentValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required"),
];

module.exports = { assignmentValidation };