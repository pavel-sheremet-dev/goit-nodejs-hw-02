const fs = require('fs').promises;
const path = require('path');
const { generateNewId, findIndex } = require('../../helpers').helpers;

const contactsPath = path.resolve(__dirname, './data.json');

class ContactsModel {
  // CRUD - C

  addContact = async body => {
    const contacts = await this.listContacts();
    const id = generateNewId(contacts);
    const newContacts = [...contacts, { id, ...body }];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return { id, ...body };
  };

  // CRUD - R

  listContacts = async () => {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  };

  // CRUD - R

  getContactById = async id => {
    const contacts = await this.listContacts();
    return contacts.find(contact => contact.id === id);
  };

  // CRUD - U

  updateContact = async (id, body) => {
    const contacts = await this.listContacts();
    const index = findIndex(contacts, id);
    if (!index) return null;

    contacts[index] = {
      ...contacts[index],
      ...body,
    };

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  };

  // CRUD - D

  removeContact = async id => {
    const contacts = await this.listContacts();
    const index = findIndex(contacts, id);

    if (!index) return false;
    contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  };
}

exports.model = new ContactsModel();
