const { Router } = require('express');

const { schema } = require('./model');
const { controller } = require('./controller');
const { authMidllwares: authMid } = require('./middlewares');
const { commonMiddlwares, uploadMiddleware: upload } = require('../../helpers');
const { config } = require('../../config');

const { validateRequest, catchError } = commonMiddlwares;
const superAdmin = config.getSubscriptions().super;

const router = Router();

router.post(
  '/signup',
  validateRequest(schema.signing),
  catchError(controller.signUp),
);

router.post(
  '/signin',
  validateRequest(schema.signing),
  catchError(controller.signIn),
);

router.get('/signout', authMid.authhorize(), catchError(controller.signOut));

router.get(
  '/current',
  authMid.authhorize(),
  catchError(controller.getCurrentUser),
);

router.patch(
  '/',
  authMid.authhorize(superAdmin),
  validateRequest(schema.updateSubscription),
  catchError(controller.updateSubscription),
);

router.patch(
  '/avatars',
  authMid.authhorize(),
  upload.single('avatar'),
  catchError(controller.updateAvatar),
);

exports.authRouter = router;
