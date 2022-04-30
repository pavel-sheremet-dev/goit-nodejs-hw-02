const { NotFound } = require('http-errors');
const { model } = require('./model');

class ContactsService {
  addContact = async reqParams => await model.create(reqParams);

  getContacts = async () => await model.find();

  getContact = async id => {
    const contact = await model.findById(id);
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  updateContact = async (id, reqParams) => {
    const contact = await model.findByIdAndUpdate(id, reqParams, {
      new: true,
      runValidators: true,
    });
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  deleteContact = async id => {
    const result = await model.deleteOne({ _id: id });
    if (!result.deletedCount) throw new NotFound('Contact not found');
  };
}

exports.service = new ContactsService();
