export const createError = (status, message) => {
  let error = new Error();
  error.status = status;
  error.message = message;
  error.stack = process.env.Env == "production" ? null : error.stack;

  return error;
};
