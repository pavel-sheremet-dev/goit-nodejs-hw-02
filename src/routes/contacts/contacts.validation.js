const joi = require('joi');

exports.validateRequest =
  (schema, reqParamsType = 'body') =>
  (req, res, next) => {
    const { error } = schema.validate(req[reqParamsType]);
    if (error) {
      return res.status(400).send(error);
    }
    next();
  };

exports.contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().required(),
});

exports.updateContactSchema = joi.object({
  name: joi.string(),
  // email: joi.string().email(),
  phone: joi.number(),
});
