const path = require('path');
const { config } = require('../../config');
const { fsOperations } = require('../../helpers');

class StaticService {
  uploadAvatar = async (file, endpoint) => {
    const { filename, path: oldPath } = file;
    const avatarsPath = config.getDirPath().avatars;
    const newPath = path.resolve(avatarsPath, filename);

    fsOperations.replaceFile(oldPath, newPath);

    return { avatarUrl: endpoint + filename };
  };
}

exports.service = new StaticService();
