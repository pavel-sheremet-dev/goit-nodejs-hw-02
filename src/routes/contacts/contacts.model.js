const fs = require('fs').promises;
const path = require('path');
const { tryAsync, generateNewId, findIndex } = require('./contacts.helpers');

const contactsPath = path.resolve(__dirname, './contacts.data.json');

// CRUD - C

const addContact = async body => {
  const contacts = await tryAsync(listContacts);

  const id = generateNewId(contacts);
  const newContact = { id, ...body };

  await tryAsync(
    fs.writeFile,
    contactsPath,
    JSON.stringify([...contacts, newContact]),
  );
  return newContact;
};

// CRUD - R

const listContacts = async () => {
  const contacts = await tryAsync(fs.readFile, contactsPath, 'utf8');
  return JSON.parse(contacts);
};

// CRUD - R

const getContactById = async id => {
  const contacts = await tryAsync(listContacts);
  return contacts.find(contact => contact.id === id);
};

// CRUD - U

const updateContact = async (id, body) => {
  const contacts = await tryAsync(listContacts);
  // const contactIndex = contacts.findIndex(contact => contact.id === id);
  const index = findIndex(contacts, id);
  if (!index) return null;

  contacts[index] = {
    ...contacts[index],
    ...body,
  };

  await tryAsync(fs.writeFile, contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

// CRUD - D

const removeContact = async id => {
  const contacts = await tryAsync(listContacts);
  const index = findIndex(contacts, id);

  if (!index) return false;

  contacts.splice(index, 1);
  await tryAsync(fs.writeFile, contactsPath, JSON.stringify(contacts));
  return true;
};

// helpers

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
