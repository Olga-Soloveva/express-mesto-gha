const NotFoundError = require('../errors/not-found-err');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};
