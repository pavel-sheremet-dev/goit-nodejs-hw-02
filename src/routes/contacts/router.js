//  CRUD
const { Router } = require('express');

const { schema } = require('./model');
const { controller } = require('./controller');
const { validateRequest, catchError } = require('../../helpers/middlewares');

const router = Router();

router.post(
  '/',
  validateRequest(schema.contact),
  catchError(controller.addContact),
);
router.get('/', catchError(controller.getContacts));
router.get(
  '/:id',
  validateRequest(schema.id, 'params'),
  catchError(controller.getContact),
);
router.put(
  '/:id',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateContact),
  catchError(controller.updateContact),
);
router.patch(
  '/:id/favorite',
  validateRequest(schema.id, 'params'),
  validateRequest(schema.updateStatusContact),
  catchError(controller.updateContact),
);
router.delete(
  '/:id',
  validateRequest(schema.id, 'params'),
  catchError(controller.deleteContact),
);

exports.contactsRouter = router;
