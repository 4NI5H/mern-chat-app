const notFound = (req, res, next) => {
  const error = new Error(`No page found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  console.log("error handler----");
  const statusCode = res.status.code === 200 ? 500 : res.status.code;
  res.status(statusCode);
  res.json({
    error: error.message,
  });
};

module.exports = { notFound, errorHandler };
