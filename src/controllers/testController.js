const { asyncHandler } = require("@Middleware/async");

/**
 * desc         
 * route         
 * access        
 */
exports.testRoute = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        data: [],
        message: "Test Route Called",
      })
  });