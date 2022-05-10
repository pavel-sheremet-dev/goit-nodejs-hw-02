const { serialize } = require('./serialize');
const { service } = require('./service');

class AuthController {
  signUp = async (req, res) => {
    const user = await service.signUp(req.body);
    res.status(201).send(serialize.user(user));
  };

  signIn = async (req, res) => {
    const user = await service.signIn(req.body);
    res.status(200).send(serialize.signInResponce(user));
  };

  signOut = async (req, res) => {
    await service.signOut(req.user.id);
    res.status(204).send();
  };

  getCurrentUser = async (req, res) => {
    const user = await service.getCurrentUser(req.user.id);
    res.status(200).send(serialize.user(user));
  };

  updateSubscription = async (req, res) => {
    const user = await service.updateSubscription(req.body);
    res.status(201).send(serialize.user(user));
  };
}

exports.controller = new AuthController();
