const errorMiddleware = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status || 500).send({
    error: true,
    message,
  });
};
export default errorMiddleware;
