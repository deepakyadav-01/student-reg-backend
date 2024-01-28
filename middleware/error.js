import createError from "http-errors";

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err);

  // If headers have already been sent to the client, delegate to Express default error handler
  if (res.headersSent) {
    return next(err);
  }

  // Handling known errors created by createHttpError
  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    // Handle other unexpected errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
