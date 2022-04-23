const { Router } = require('express');
const CreateError = require('http-errors');
const {
  normalizeContactResponce,
  normalizeContactsListResponce,
} = require('./contacts.helpers');

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require('./contacts.model');
const {
  validateRequest,
  contactSchema,
  updateContactSchema,
} = require('./contacts.validation');

const router = Router();

router.post('/', validateRequest(contactSchema), async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).send(normalizeContactResponce(contact));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).send(normalizeContactsListResponce(contacts));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(200).send(normalizeContactResponce(contact));
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validateRequest(updateContactSchema),
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.id, req.body);
      res.status(200).send(normalizeContactResponce(contact));
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const isContactDeleted = await removeContact(req.params.id);
    if (!isContactDeleted) {
      next(new CreateError.NotFound('Contact not found'));
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
