const DataError = require('../errors/DataError');
const NotFoundError = require('../errors/NotFoundError');
const Item = require('../models/item');
const User = require('../models/user');

async function setRating(req, res, next) {
  try {
    const { value, id } = req.body;
    const user = await User.findById(req.user._id);
    const item = await Item.findById(id);
    if (!user || !item) {
      throw new NotFoundError();
    }
    const userIndex = user.ratings.findIndex(rating => rating.id === id);
    if (userIndex === -1) {
      user.ratings.push({ id, value });
      item.ratingAmount++;
    } else {
      user.ratings[userIndex].value = value;
    }
    item.rating = item.rating === -1 ? value : (item.rating + value) / 2;
    res.send({
      rating: item.rating,
      amount: item.ratingAmount,
    })
  } catch (err) {
    next(err);
  }

}

async function resetRating(req, res, next) {
  try {
    const { id } = req.body;
    const user = await User.findById(req.user._id);
    const item = await Item.findById(id);
    if (!user || !item) {
      throw new NotFoundError();
    }
    const userIndex = user.ratings.findIndex(rating => rating.id === id);
    if (userIndex === -1) {
      throw new DataError();
    } else {
      item.rating = item.rating - user.ratings[userIndex].value;
      if (item.rating < 0) item.rating = -1;
      item.ratingAmount--;
      user.ratings.splice(userIndex, 1);
    }
    res.send({
      rating: item.rating,
      amount: item.ratingAmount,
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  setRating,
  resetRating,
};
