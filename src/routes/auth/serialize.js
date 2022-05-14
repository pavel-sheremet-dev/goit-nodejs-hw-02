class UserSerialize {
  user = ({ id, email, subscription }) => ({
    id,
    email,
    subscription,
  });

  signInResponce = ({ user, token }) => ({
    user: this.user(user),
    token,
  });

  userAvatarUrl = ({ avatarUrl }) => ({
    avatarUrl,
  });
}

exports.serialize = new UserSerialize();
