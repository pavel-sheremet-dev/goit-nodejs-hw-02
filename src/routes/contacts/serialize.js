class ContactSerialize {
  serializeContact = ({ id, name, email, phone, favorite, owner }) => ({
    id,
    name,
    email,
    phone,
    favorite,
    owner,
  });

  contactResponce = contact => ({
    contact: this.serializeContact(contact),
  });

  contactsListResponce = (contacts, responseFields) =>
    Object.keys(responseFields).reduce(
      (acc, field) => ({ ...acc, [field]: responseFields[field] }),
      {
        contacts: contacts.map(this.serializeContact),
      },
    );
}

exports.serialize = new ContactSerialize();
