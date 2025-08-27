const bcrypt = require('bcryptjs');

const validatePasswordConfirmation = (password, confirmPassword) => {
  return password === confirmPassword;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  validatePasswordConfirmation,
  hashPassword
};