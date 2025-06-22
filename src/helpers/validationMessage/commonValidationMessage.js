const {
  emailMaxChar,
  emailMinChar,
  addressMaxChar,
  addressMinChar,
  lastNameMaxChar,
  lastNameMinChar,
  phoneNumberChar,
  firstNameMaxChar,
  firstNameMinChar,
  aadhaarNumberChar,
} = require("@MEHelpers/validationConst");

const commonValidationMessage = {
  firstNameRequired: "First name is required",
  firstNameEmpty: "First name cannot be empty",
  firstNameInvalidFormate: "First name must be string formate",
  firstNameMaxLength: `First name must be less then ${firstNameMaxChar} characters`,
  firstNameMinLength: `First name must be greater then ${firstNameMinChar} characters`,
  lastNameRequired: "Last name is required",
  lastNameEmpty: "Last name cannot be empty",
  lastNameInvalidFormate: "First name must be string formate",
  lastNameMaxLength: `Last name must be less then ${lastNameMaxChar} characters`,
  lastNameMinLength: `Last name must be greater then ${lastNameMinChar} characters`,
  emailRequired: "Email is required",
  emailEmpty: "Email cannot be empty",
  emailInvalid: "Invalid email format",
  emailInvalidFormate: "Email must be string formate",
  emailMaxLength: `Email must be less then ${emailMaxChar} characters`,
  emailMinLength: `Email must be greater then ${emailMinChar} characters`,
  phoneNumberRequired: "Phone number is required",
  phoneNumberEmpty: "Phone number cannot be empty",
  phoneNumberInvalid: "Invalid phone number format",
  phoneNumberInvalidFormate: "Phone number must be string formate",
  phoneNumberMaxLength: `Phone number must be ${phoneNumberChar} characters`,
  phoneNumberMinLength: `Phone number must be ${phoneNumberChar} characters`,
};

module.exports = commonValidationMessage;
