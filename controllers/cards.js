const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new ServerError('На сервере произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .populate(['owner'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
      }
      if (req.user._id !== card.owner.id) {
        next(new ForbiddenError('Нет прав на удаление карточек других пользователей'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id карточки'));
      }
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Передан не существуюший id карточки'));
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
    }
    next(new ServerError('На сервере произошла ошибка'));
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])

  .then((card) => {
    if (!card) {
      next(new NotFoundError('Передан не существуюший id карточки'));
      return;
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
    }
    next(new ServerError('На сервере произошла ошибка'));
  });
