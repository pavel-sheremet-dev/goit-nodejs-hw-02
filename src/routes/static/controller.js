const { service } = require('./service');

class StaticController {
  uploadAvatar = async (req, res) => {
    const { file, url } = req;

    const avatar = await service.uploadAvatar(file, url);
    res.status(201).send(avatar);
  };
}

exports.controller = new StaticController();
