const errors = require('http-errors');
const mongoose = require('mongoose');
const joi = require('joi');

const { Schema, isValidObjectId } = mongoose;

class JoiContactSchema {
  contact = joi.object({
    name: joi
      .string()
      .pattern(/^[a-zA-Z\s.'’ʼ-]{3,30}$/)
      .required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .pattern(/^[0-9()+\s-]{10,19}$/)
      .required(),
    password: joi
      .string()
      .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{3,30}$/)
      .required(),
    favorite: joi.boolean(),
  });

  updateContact = joi.object({
    name: joi.string().pattern(/^[a-zA-Z\s.'’ʼ-]{3,30}$/),
    email: joi.string().email(),
    phone: joi.string(),
    favorite: joi.boolean(),
  });

  updateStatusContact = joi.object({
    favorite: joi.boolean().required(),
  });

  id = joi.object({
    id: joi
      .string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error('Contact not Found. Invalid ID');
        }
        return value;
      })
      .required(),
  });
}

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Set password for contact'],
  },
});

const schemaErrorHandlingMiddlware = (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new errors[409](
        `User with email "${error.keyValue.email}" already exist`,
      ),
    );
  } else {
    next();
  }
};

contactsSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandlingMiddlware);

exports.schema = new JoiContactSchema();
exports.model = mongoose.model('Contact', contactsSchema, 'contacts');
