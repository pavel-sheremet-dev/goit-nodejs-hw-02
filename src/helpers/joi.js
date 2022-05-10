const { isValidObjectId } = require('mongoose');

exports.checkObjectId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Contact not Found. Invalid ID');
  }
  return value;
};

exports.checkLimit = (value, helpers) => {
  const max = 20;
  if (value > max) {
    return helpers.message(`Max limit is ${max}`);
  }
  return value;
};
