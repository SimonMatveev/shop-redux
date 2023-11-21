const Item = require('../models/item');
const NotFoundError = require('../errors/NotFoundError');
const DelError = require('../errors/DelError');
const DataError = require('../errors/DataError');
const {
  ADD_MOVIE_ERR,
  DEL_MOVIE_NOT_FOUND_ERR,
  DEL_MOVIE_VALIDATION_ERR,
  DEL_MOVIE_WRONG_ID_ERR,
  GET_USER_ERR,
} = require('../utils/constants');

async function getItems(req, res, next) {
  try {
    const filters = req.query;
    const category = filters.category ? filters.category.split(',') : null;
    const platforms = filters.platforms ? filters.platforms.split(',') : null;
    let items = await Item.find({})
    let resItems = items.filter(item => {
      let isValidCategory = true;
      let isValidPlatform = true;
      if (category) {
        for (let filterCategory of category) {
          isValidCategory = item.category.some(c => c === filterCategory);
          if (isValidCategory) break;
        }
      }
      if (platforms) {
        for (let platformsItem of platforms) {
          isValidPlatform = item.platforms.some(p => p === platformsItem);
          if (isValidPlatform) break;
        }
      }
      return isValidCategory && isValidPlatform;
    })
    res.send({ data: resItems })
  } catch (err) {
    next(err);
  }
}

async function getItem(req, res, next) {
  try {
    const { itemId } = req.params
    const item = await Item.findOne({ _id: itemId });
    if (!item) throw new NotFoundError();
    res.send({ data: item });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new DataError(GET_USER_ERR));
    } else next(err);
  }
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
  getItem,
  addItem,
  deleteItem,
  changePrice,
  changeInStock,
};
