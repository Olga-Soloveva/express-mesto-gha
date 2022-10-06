const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизацияzz' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};
