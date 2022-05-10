const statusMessages = {
  404: 'Not found',
  // Тд.
};

exports.createError = (status, message = statusMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
