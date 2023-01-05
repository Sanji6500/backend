const ErrorResponse = require("../Utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log("1111111111111111111111");
  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: "aaaa" || "Operation failed",
  });
};

module.exports = errorHandler;
