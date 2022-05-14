const express = require('express');
const { config } = require('../../config');
const { commonMiddlwares, uploadMiddleware: upload } = require('../../helpers');
const { authMidllwares: authMid } = require('../auth/middlewares');
const { controller } = require('./controller');

const { catchError } = commonMiddlwares;
const superAdmin = config.getSubscriptions().super;

const router = express.Router();

router.post(
  '/avatars',
  authMid.authhorize(superAdmin),
  upload.single('avatar'),
  catchError(controller.uploadAvatar),
);

exports.staticRouter = router;
