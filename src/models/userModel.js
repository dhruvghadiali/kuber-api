const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { emailRegex, phoneRegex } = require("@MEHelpers/regex");
const {
  emailMaxChar,
  emailMinChar,
  passwordMinChar,
  phoneNumberChar,
  usernameMaxChar,
  usernameMinChar,
  lastNameMaxChar,
  lastNameMinChar,
  firstNameMaxChar,
  firstNameMinChar,
  passwordMaxCharWithEncryption,
} = require("@Helpers/validationConst");

const {
  emailInvalid,
  emailRequired,
  emailMaxLength,
  emailMinLength,
  passwordRequired,
  usernameRequired,
  lastNameRequired,
  passwordMinLength,
  usernameMaxLength,
  usernameMinLength,
  lastNameMaxLength,
  lastNameMinLength,
  firstNameRequired,
  firstNameMaxLength,
  firstNameMinLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  phoneNumberMaxLength,
  phoneNumberMinLength,
  passwordMaxLengthWithEncryption,
} = require("@Helpers/validationMessage");

const { Schema } = mongoose;

const userSchema = Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, firstNameRequired],
      maxlength: [firstNameMaxChar, firstNameMaxLength],
      minlength: [firstNameMinChar, firstNameMinLength],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, lastNameRequired],
      maxlength: [lastNameMaxChar, lastNameMaxLength],
      minlength: [lastNameMinChar, lastNameMinLength],
    },
    email: {
      type: String,
      trim: true,
      required: [true, emailRequired],
      maxlength: [emailMaxChar, emailMaxLength],
      minlength: [emailMinChar, emailMinLength],
      match: [emailRegex, emailInvalid],
    },
    phone_number: {
      type: String,
      trim: true,
      required: [true, phoneNumberRequired],
      maxlength: [phoneNumberChar, phoneNumberMaxLength],
      minlength: [phoneNumberChar, phoneNumberMinLength],
      match: [phoneRegex, phoneNumberInvalid],
    },
    username: {
      type: String,
      trim: true,
      index: { unique: true },
      required: [true, usernameRequired],
      maxlength: [usernameMaxChar, usernameMaxLength],
      minlength: [usernameMinChar, usernameMinLength],
    },
    password: {
      type: String,
      required: [true, passwordRequired],
      maxlength: [
        passwordMaxCharWithEncryption,
        passwordMaxLengthWithEncryption,
      ],
      minlength: [passwordMinChar, passwordMinLength],
      select: false,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.is_active = true; 
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update && this._update.password) {
    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

userSchema.methods.getSignedJwtToken = function () {
  let expiresIn = "1m";
  expiresIn = process.env.JWT_EXPIRE_TIME || expiresIn;
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("user", userSchema);
