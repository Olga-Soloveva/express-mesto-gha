const User = require("../models/user");
const {
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) =>
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Запрашиваемый пользователь не найден",
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.name);
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Запрашиваемый ресурс не найден" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      } else if (err.name === "CastError") {
        return res.status(NOT_FOUND_CODE).send({
          message: "Запрашиваемый пользователь не найден",
        });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      } else if (err.name === "CastError") {
        return res.status(NOT_FOUND_CODE).send({
          message: "Запрашиваемый пользователь не найден",
        });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};
