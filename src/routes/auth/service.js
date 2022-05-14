const path = require('path');
const { NotFound, Forbidden } = require('http-errors');
const { auth, fsOperations, resizeImage } = require('../../helpers');
const { config } = require('../../config');
const { User } = require('./model');

const { getSubscriptions, getDirPath } = config;

class AuthService {
  signUp = async reqParams => {
    const hashPassword = await auth.createHashPassword(reqParams.password);
    const user = await User.create({ ...reqParams, password: hashPassword });
    return user;
  };

  signIn = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user)
      throw new NotFound('User not found. Please check email or sign up');

    const isValidPassword = await auth.comparePassword(password, user.password);

    if (!isValidPassword) throw new Forbidden('Password is wrong');

    const token = auth.createToken(user);

    await User.findByIdAndUpdate(
      user.id,
      { token },
      {
        new: true,
        runValidators: true,
      },
    );

    return { user, token };
  };

  signOut = async id => await User.findByIdAndUpdate(id, { token: null });

  getCurrentUser = async id => {
    const user = await User.findById(id);
    if (!user) throw new NotFound('User not found');
    return user;
  };

  updateSubscription = async ({
    id,
    subscription,
    superAdminPassword = 'empty',
  }) => {
    const superAdmin = getSubscriptions().super;
    const isUpdatetoAdmin = subscription === superAdmin;
    const isCorrectPassword = superAdminPassword === process.env.ADMIN_PASSWORD;

    if (isUpdatetoAdmin && !isCorrectPassword) {
      throw new Forbidden('Аccess denied');
    }

    const user = await User.findByIdAndUpdate(
      id,
      { subscription },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) throw new NotFound('User not found');
    return user;
  };

  updateAvatar = async (user, file, endpoint) => {
    const { filename, path: oldPath } = file;
    const { id, avatarUrl: oldAvatarUrl } = user;

    await resizeImage(oldPath);

    const avatarsPath = getDirPath().avatars;
    const newPath = path.join(avatarsPath, filename);

    await fsOperations.replaceFile(oldPath, newPath);

    const avatarUrl = endpoint + '/' + filename;

    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { avatarUrl },
      {
        new: true,
      },
    );

    const pathTodelete = userToUpdate ? oldAvatarUrl : avatarUrl;
    await fsOperations.removeOldFileFromPublic(pathTodelete);

    if (!userToUpdate) throw new NotFound('User not found');

    return userToUpdate;
  };
}

exports.service = new AuthService();
