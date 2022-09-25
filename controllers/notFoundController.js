const { NOT_FOUND_CODE } = require('../utils/constants');

module.exports.notFoundController = (req, res) => {
  res.status(NOT_FOUND_CODE).send({message: "Запрашиваемый ресурс не найден"})
};

