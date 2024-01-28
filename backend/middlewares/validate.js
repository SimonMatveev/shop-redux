const { celebrate, Joi } = require('celebrate');
const REG_EXP_URL = require('../utils/regexp');
const { PLATFORM_ENUM, CATEGORY_ENUM } = require('../utils/constants');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatePatchMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(2).max(30),
  }),
});

const validateAddItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    studio: Joi.string().required(),
    price: Joi.number().required(),
    priceWithSale: Joi.number(),
    category: Joi.array().items(
      Joi.string()
        .required()
        .valid(...CATEGORY_ENUM)
    ),
    inStockAmount: Joi.number().required(),
    releaseDate: Joi.string().required(),
    platforms: Joi.array().items(
      Joi.string()
        .required()
        .valid(...PLATFORM_ENUM)
    ),
    series: Joi.string(),
    images: Joi.array().items(
      Joi.string().required().pattern(REG_EXP_URL, { name: 'url' })
    ),
  }),
});

const validateDeleteItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
  }),
});

const validateChangePrice = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    price: Joi.number(),
    priceWithSale: Joi.number(),
  }),
});

const validateInStock = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    inStockAmount: Joi.number(),
  }),
});

const validateCart = celebrate({
  body: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
    platform: Joi.string()
      .required()
      .valid(...PLATFORM_ENUM),
  }),
});

const validateGetItem = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required(),
  }),
});

const validateGetSeries = celebrate({
  params: Joi.object().keys({
    seriesId: Joi.number().required(),
  }),
});

const validateSetRating = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
    value: Joi.number().required(),
  }),
});

const validateResetRating = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validatePatchMe,
  validateAddItem,
  validateDeleteItem,
  validateChangePrice,
  validateInStock,
  validateCart,
  validateGetItem,
  validateGetSeries,
  validateSetRating,
  validateResetRating,
};
