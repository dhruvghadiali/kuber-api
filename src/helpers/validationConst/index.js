const userValidationConst = require("@Helpers/validationConst/userValidationConst");
const commonValidationConst = require("@Helpers/validationConst/commonValidationConst");

const validationConst = {
  ...userValidationConst,
  ...commonValidationConst,
};

module.exports = validationConst;
