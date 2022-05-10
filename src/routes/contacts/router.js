//  CRUD
const { Router } = require('express');

const { schema } = require('./model');
const { controller } = require('./controller');
const { commonMiddlwares } = require('../../helpers');
const { authMidllwares: authMid } = require('../auth/middlewares');

const { validateRequest, catchError } = commonMiddlwares;

const router = Router();

router.post(
  '/',
  authMid.authhorize(),
  validateRequest(schema.contact),
  catchError(controller.addContact),
);
router.get(
  '/',
  authMid.authhorize(),
  validateRequest(schema.queryParams, 'query'),
  catchError(controller.getContacts),
);
router.get(
  '/:id',
  authMid.authhorize(),
  validateRequest(schema.id, 'params'),
  catchError(controller.getContact),
);
router.put(
  '/:id',
  authMid.authhorize(),
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateContact),
  catchError(controller.updateContact),
);
router.patch(
  '/:id/favorite',
  authMid.authhorize(),
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateStatusContact),
  catchError(controller.updateContact),
);
router.delete(
  '/:id',
  authMid.authhorize(),
  validateRequest(schema.id, 'params'),
  catchError(controller.deleteContact),
);

exports.contactsRouter = router;
