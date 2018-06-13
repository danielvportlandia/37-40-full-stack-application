const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('Profile is required');
  }

  const {
    firstName, location, account,
  } = profile;

  if (!firstName || !location || !account) {
    throw new Error('Invalid Profile');
  }
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;

    case 'TOKEN_REMOVE':
      return null;

    default:
      return state;
  }
};
