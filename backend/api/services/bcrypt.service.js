const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
  const password = (member) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(member.password, salt);

    return hash;
  };

  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
