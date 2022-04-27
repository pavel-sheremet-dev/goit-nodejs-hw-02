const { NotFound } = require('http-errors');
const { model } = require('./model');

class ContactsService {
  addContact = async reqParams => await model.addContact(reqParams);

  getContacts = async () => await model.listContacts();

  getContact = async id => {
    const contact = await model.getContactById(id);
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  updateContact = async (id, reqParams) => {
    const contact = await model.updateContact(id, reqParams);
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  deleteContact = async id => {
    const isContactDeleted = await model.removeContact(id);
    if (!isContactDeleted) throw new NotFound('Contact not found');
  };
}

exports.service = new ContactsService();
