const Item = require('../models/item');
const NotFoundError = require('../errors/NotFoundError');
const DelError = require('../errors/DelError');
const DataError = require('../errors/DataError');
const {
  ADD_MOVIE_ERR,
  DEL_MOVIE_NOT_OWN_ERR,
  DEL_MOVIE_NOT_FOUND_ERR,
  DEL_MOVIE_VALIDATION_ERR,
  DEL_MOVIE_WRONG_ID_ERR,
} = require('../utils/constants');

function getItems(req, res, next) {
  Item.find({})
    .then((items) => res.send({ data: items }))
    .catch(next);
}

function addItem(req, res, next) {
  Item.create({ ...req.body })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(ADD_MOVIE_ERR));
      } else {
        next(err);
      }
    });
}

function deleteItem(req, res, next) {
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_MOVIE_NOT_FOUND_ERR);
      return Item.deleteOne(item)
        .then(() => {
          res.send({ data: item });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DEL_MOVIE_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_MOVIE_WRONG_ID_ERR));
      } else next(err);
    });
}

function changePrice(req, res, next) {
  const { price, priceWithSale } = req.body;
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_MOVIE_NOT_FOUND_ERR);
      return Item.findByIdAndUpdate(req.params.itemId, { price, priceWithSale }, {
        new: true,
        runValidators: true,
      })
        .then((item) => {
          res.send({ data: item });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DEL_MOVIE_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_MOVIE_WRONG_ID_ERR));
      } else next(err);
    });
}

function changeInStock(req, res, next) {
  const { inStockAmount } = req.body;
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_MOVIE_NOT_FOUND_ERR);
      return Item.findByIdAndUpdate(req.params.itemId, { inStockAmount }, {
        new: true,
        runValidators: true,
      })
        .then((item) => {
          res.send({ data: item });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DEL_MOVIE_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_MOVIE_WRONG_ID_ERR));
      } else next(err);
    });
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
  changePrice,
  changeInStock,
};
