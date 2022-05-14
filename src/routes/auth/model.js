const mongoose = require('mongoose');
const errors = require('http-errors');
const joi = require('joi');

const { checkObjectId } = require('../../helpers');
const { config } = require('../../config');

class JoiAuthSchema {
  signing = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{8,20}$/)
      .required(),
  });

  updateSubscription = joi.object({
    id: joi.string().custom(checkObjectId).required(),
    subscription: joi
      .string()
      .valid(...config.getSubscriptions().all)
      .required(),
    superAdminPassword: joi.string().pattern(/^[0-9a-zA-Z_\s'’ʼ-]{8,30}$/),
  });
}

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    enum: config.getSubscriptions().all,
    default: config.getSubscriptions().starter,
  },
  token: {
    type: String,
    default: null,
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

usersSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandlingMiddlware);

exports.schema = new JoiAuthSchema();
exports.User = mongoose.model('User', usersSchema, 'users');
