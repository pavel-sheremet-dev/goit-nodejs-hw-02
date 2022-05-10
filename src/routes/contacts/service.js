const { NotFound } = require('http-errors');
const { filters } = require('../../helpers');
const { Contact } = require('./model');

class ContactsService {
  addContact = async reqParams => await Contact.create(reqParams);

  getContacts = async (pagination, filterParams) => {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const filter = filters.getFromQueryParams(filterParams);

    const [contacts, totalContacts] = await Promise.all([
      Contact.find(filter).skip(skip).limit(limit),
      Contact.count(filter),
    ]);

    if (!contacts.length) throw new NotFound('Contacts not found');

    return { contacts, totalContacts };
  };

  getContact = async (id, owner) => {
    const contact = await Contact.findOne({ _id: id, owner });
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  updateContact = async (id, reqParams, owner) => {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      reqParams,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!contact) throw new NotFound('Contact not found');
    return contact;
  };

  deleteContact = async (id, owner) => {
    const result = await Contact.deleteOne({ _id: id, owner });
    if (!result.deletedCount) throw new NotFound('Contact not found');
  };
}

exports.service = new ContactsService();
