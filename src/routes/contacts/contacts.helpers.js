const createError = require('http-errors');
const { nanoid } = require('nanoid');

// heplers functions for work with model

exports.tryAsync = async (asyncFunction, ...args) => {
  try {
    return await asyncFunction(...args);
  } catch (error) {
    throw new createError.BadGateway('Database not available');
  }
};

exports.generateNewId = contacts => {
  let id = '';
  do {
    id = nanoid();
  } while (findIndex(contacts, id));
  return id;
};

const findIndex = (data, id) => {
  const index = data.findIndex(item => item.id === id);
  return index !== -1 ? index : null;
};

exports.findIndex = findIndex;

// heplers functions for send responce

exports.normalizeContactResponce = contact => ({
  contact: normalizeContact(contact),
});

exports.normalizeContactsListResponce = contacts => ({
  contacts: contacts.map(normalizeContact),
});

const normalizeContact = ({ id, name, email, phone }) => ({
  id,
  name,
  // email,
  phone,
});
