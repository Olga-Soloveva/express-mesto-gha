const Card = require("../models/card");
const {
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} = require("../utils/constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch((err) =>
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Карточка с указанным id не найдена",
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.name);
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Запрашиваемый ресурс не найден" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])

    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Передан не существуюший id карточки",
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.name);
        return res
          .status(BAD_REQUEST_CODE)
          .send({
            message: "Переданы некорректные данные для постановки лайка.",
          });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Передан не существуюший id карточки",
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.name);
        return res
          .status(BAD_REQUEST_CODE)
          .send({
            message: "Переданы некорректные данные для снятия лайка.",
          });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
