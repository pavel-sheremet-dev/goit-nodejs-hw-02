const { serialize } = require('./serialize');
const { service } = require('./service');

class ContactsController {
  addContact = async (req, res) => {
    const contact = await service.addContact({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).send(serialize.contactResponce(contact));
  };

  getContacts = async (req, res) => {
    const { id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;

    const { contacts, totalContacts } = await service.getContacts(
      { page, limit },
      { owner, favorite },
    );

    res.status(200).send(
      serialize.contactsListResponce(contacts, {
        totalContacts,
        page,
        limit,
      }),
    );
  };

  getContact = async (req, res) => {
    const contact = await service.getContact(req.params.id, req.user.id);
    res.status(200).send(serialize.contactResponce(contact));
  };

  updateContact = async (req, res) => {
    const contact = await service.updateContact(
      req.params.id,
      req.body,
      req.user.id,
    );
    res.status(200).send(serialize.contactResponce(contact));
  };

  deleteContact = async (req, res) => {
    await service.deleteContact(req.params.id, req.user.id);
    res.status(204).send();
  };
}

exports.controller = new ContactsController();
