const errors = require('http-errors');
const mongoose = require('mongoose');
const joi = require('joi');
const { checkObjectId, checkLimit } = require('../../helpers');

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
    id: joi.string().custom(checkObjectId).required(),
  });

  queryParams = joi.object({
    page: joi.number(),
    limit: joi.number().custom(checkLimit),
    favorite: joi.boolean(),
  });
}

const { Schema } = mongoose;

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const populateOwner = function (...fields) {
  return function () {
    this.populate('owner', fields);
  };
};

const schemaErrorHandling = (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new errors[409](
        `Contact with email "${error.keyValue.email}" already exist`,
      ),
    );
  } else {
    next();
  }
};

contactsSchema.pre(
  ['find', 'findOne', 'findOneAndUpdate'],
  populateOwner('email'),
);
contactsSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandling);

exports.schema = new JoiContactSchema();
exports.Contact = mongoose.model('Contact', contactsSchema, 'contacts');
