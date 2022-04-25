//  CRUD
const { Router } = require('express');

const { validateRequest, asyncWrapper } = require('../../helpers').middlewares;
const { contactSchema, updateContactSchema } = require('./schemas');
const { addContact, getContacts, getContact, updateContact, deleteContact } =
  require('./controller').controller;

const router = Router();

// 1. C - Create

router.post('/', validateRequest(contactSchema), asyncWrapper(addContact));
router.get('/', asyncWrapper(getContacts));
router.get('/:id', asyncWrapper(getContact));
router.put(
  '/:id',
  validateRequest(updateContactSchema),
  asyncWrapper(updateContact),
);
router.delete('/:id', asyncWrapper(deleteContact));

exports.contactsRouter = router;
