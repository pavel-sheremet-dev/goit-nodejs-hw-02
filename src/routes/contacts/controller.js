const { NotFound } = require('http-errors');
const { model } = require('./model');
const {
  serializeContactsListResponce,
  serializeContactResponce,
} = require('./serialize');

class ContactsController {
  addContact = async (req, res, next) => {
    const contact = await model.addContact(req.body);

    res.status(201).send(serializeContactResponce(contact));
  };

  getContacts = async (req, res, next) => {
    const contacts = await model.listContacts();

    res.status(200).send(serializeContactsListResponce(contacts));
  };

  getContact = async (req, res, next) => {
    const contact = await model.getContactById(req.params.id);
    if (!contact) throw new NotFound('Contact not found');

    res.status(200).send(serializeContactResponce(contact));
  };

  updateContact = async (req, res, next) => {
    const contact = await model.updateContact(req.params.id, req.body);
    if (!contact) throw new NotFound('Contact not found');

    res.status(200).send(serializeContactResponce(contact));
  };

  deleteContact = async (req, res, next) => {
    const isContactDeleted = await model.removeContact(req.params.id);
    if (!isContactDeleted) throw new NotFound('Contact not found');

    res.status(204).send();
  };
}

exports.controller = new ContactsController();
