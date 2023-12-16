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
    let userRatings = user.ratings;
    let ratingAmount = item.ratingAmount;
    let rating = item.rating;
    const userIndex = userRatings.findIndex(rating => rating.id.equals(id));
    if (userIndex === -1) {
      userRatings.push({ id, value });
      ratingAmount++;
    } else {
      rating = ratingAmount === 1 ? -1 : (rating * (ratingAmount) - userRatings[userIndex].value) / (ratingAmount - 1);
      userRatings[userIndex].value = value;
    }
    rating = rating === -1 ? value : (rating * (ratingAmount - 1) + value) / ratingAmount;
    await User.findByIdAndUpdate(req.user._id, { ratings: userRatings });
    await Item.findByIdAndUpdate(id, { ratingAmount, rating });
    res.send({
      rating: rating,
      amount: ratingAmount,
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
    const userIndex = user.ratings.findIndex(rating => rating.id.equals(id));
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
