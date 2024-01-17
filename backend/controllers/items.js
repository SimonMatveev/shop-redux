const Item = require('../models/item');
const Series = require('../models/series');
const NotFoundError = require('../errors/NotFoundError');
const DataError = require('../errors/DataError');
const {
  ADD_ITEM_ERR,
  DEL_ITEM_NOT_FOUND_ERR,
  DEL_ITEM_VALIDATION_ERR,
  DEL_ITEM_WRONG_ID_ERR,
  GET_USER_ERR,
} = require('../utils/constants');

async function getItems(req, res, next) {
  try {
    const {
      category: categoryData = null,
      platforms: platformsData = null,
      sortItem: sortItemData = 'name',
      sortOrder: sortOrderData = 'asc',
      page: pageData = '1',
      limit: limitData = '20',
    } = req.query;
    const category = categoryData ? categoryData.split(',') : [];
    const platforms = platformsData ? platformsData.split(',') : [];
    const page = !isNaN(Number(pageData)) ? Number(pageData) : 1;
    const limit = !isNaN(Number(limitData)) ? Number(limitData) : 1;
    const items = await Item.find({}).sort({ [sortItemData]: sortOrderData })
    const resItems = items.filter(item => {
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
    const lengthToSend = resItems.length;
    const itemsToSend = resItems.splice((page - 1) * limit, limit);
    res.send({
      data: itemsToSend,
      dbLength: lengthToSend,
    })
  } catch (err) {
    next(err);
  }
}

async function getDiscountedItems(req, res, next) {
  try {
    const items = await Item.find({});
    const itemsToSend = items.filter(item => item.price !== item.priceWithSale);
    res.send({
      data: itemsToSend,
    })
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

async function getSeriesList(res, res, next) {
  try {
    const seriesList = await Series.find({});
    res.send({ data: seriesList })
  } catch (err) {
    next(err);
  }
}

async function getSeries(req, res, next) {
  try {
    const { seriesId } = req.params;
    const series = await Series.findOne({ id: seriesId });
    if (!series) throw new NotFoundError();
    const items = await Item.find({ series: series.name }).sort({ 'releaseDate': 'asc' });
    res.send({ data: items })
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const item = await Item.create({ ...req.body });
    const { series } = req.body;
    if (series) {
      const seriesInDB = await Series.findOne({ name: series });
      if (!seriesInDB) {
        const allSeries = await Series.find({});
        Series.create({ name: series, id: allSeries.length + 1 });
      }
    }
    res.status(201).send(item);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new DataError(ADD_ITEM_ERR));
    } else {
      next(err);
    }
  }
}

function deleteItem(req, res, next) {
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_ITEM_NOT_FOUND_ERR);
      return Item.deleteOne(item)
        .then(() => {
          res.send({ data: item });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DEL_ITEM_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_ITEM_WRONG_ID_ERR));
      } else next(err);
    });
}

function changePrice(req, res, next) {
  const { price, priceWithSale } = req.body;
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_ITEM_NOT_FOUND_ERR);
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
        next(new DataError(DEL_ITEM_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_ITEM_WRONG_ID_ERR));
      } else next(err);
    });
}

function changeInStock(req, res, next) {
  const { inStockAmount } = req.body;
  Item.findById(req.params.itemId)
    .then((item) => {
      if (!item) throw new NotFoundError(DEL_ITEM_NOT_FOUND_ERR);
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
        next(new DataError(DEL_ITEM_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_ITEM_WRONG_ID_ERR));
      } else next(err);
    });
}

module.exports = {
  getItems,
  getDiscountedItems,
  getItem,
  addItem,
  deleteItem,
  changePrice,
  changeInStock,
  getSeries,
  getSeriesList,
};
