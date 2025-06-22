const userValidationMessage = require("@Helpers/validationMessage/userValidationMessage");
const commonValidationMessage = require("@Helpers/validationMessage/commonValidationMessage");

const validationMessage = {
  ...userValidationMessage,
  ...commonValidationMessage,
};

module.exports = validationMessage;
