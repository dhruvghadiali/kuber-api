const User = require("@Models/userModel");
const ErrorResponse = require("@Utils/errorResponse");

const { asyncHandler } = require("@Middleware/async");
// const {
//   invalidFormat,
//   invalidCredentials,
//   superAdminSignUpError,
//   superAdminSignUpDBError,
//   superAdminSignUpSuccess,
//   superAdminSignInSuccess,
//   superAdminPasswordChangedError,
//   superAdminSignUpActivationError,
//   superAdminPasswordChangedSuccess,
// } = require("@Helpers/responseMessage");

/**
 * @desc    Signup new user
 * @route   POST /super-admin/signup
 * @access  Super Admin
 */
const signUp = asyncHandler(async (req, res, next) => {
  // Create new super admin account
  const user = await User.create(req.body);

  if (user) {
    // Send response
    res.status(201).json({
      data: [],
      message: "User created successfully",
      status: 201,
    });
  } else {
    // Send error response
    next(new ErrorResponse("User creation failed", 401));
  }
});

/**
 * @desc    Signin user
 * @route   POST /user/signin
 * @access  User
 */
const signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    // Find user by username
    const user = await User.findOne({
      username: username,
      is_active: true,
    }).select([
      "password",
      "username",
      "email",
      "first_name",
      "last_name",
      "phone_number",
    ]);

    if (user) {
      // Check req body password with encrypted password stored in DB.
      const isPasswordMatch = await user.matchPassword(password);

      if (isPasswordMatch) {
        // Create new JWT token.
        let token = user.getSignedJwtToken();
        user._doc.token = token;
        delete user._doc.password;

        // Send response
        res.status(200).json({
          data: [user],
          message: "User signed in successfully",
          status: 200,
        });
      } else {
        // Send error response
        next(new ErrorResponse("Invalid credentials", 401));
      }
    } else {
      // Send error response
      next(new ErrorResponse("Invalid credentials", 401));
    }
  } else {
    // Send error response
    next(new ErrorResponse("Invalid format", 400));
  }
});

module.exports = {
  signUp,
  signIn,
};
