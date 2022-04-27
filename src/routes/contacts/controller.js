const { NotFound } = require('http-errors');
const {
  serializeContactsListResponce,
  serializeContactResponce,
} = require('./serialize');
const { service } = require('./service');

class ContactsController {
  addContact = async (req, res) => {
    const contact = await service.addContact(req.body);

    res.status(201).send(serializeContactResponce(contact));
  };

  getContacts = async (req, res) => {
    const contacts = await service.getContacts();

    res.status(200).send(serializeContactsListResponce(contacts));
  };

  getContact = async (req, res) => {
    const contact = await service.getContact(req.params.id);
    if (!contact) throw new NotFound('Contact not found');

    res.status(200).send(serializeContactResponce(contact));
  };

  updateContact = async (req, res) => {
    const contact = await service.updateContact(req.params.id, req.body);
    if (!contact) throw new NotFound('Contact not found');

    res.status(200).send(serializeContactResponce(contact));
  };

  deleteContact = async (req, res) => {
    const isContactDeleted = await service.deleteContact(req.params.id);
    if (!isContactDeleted) throw new NotFound('Contact not found');

    res.status(204).send();
  };
}

exports.controller = new ContactsController();
