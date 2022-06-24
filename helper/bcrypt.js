const bcrypt = require('bcryptjs');

const hasPassword = (password) => {
  const salt = bcrypt.getSalt(10);
  const has = bcrypt.hashSync(password, salt);
  return has;
};

const comparePassword = (password, has) => {
  return bcrypt.compareSync(password, has);
};

module.exports = {
  hasPassword,
  comparePassword,
};
