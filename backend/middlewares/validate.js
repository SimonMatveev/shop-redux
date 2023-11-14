const { celebrate, Joi } = require('celebrate');
const REG_EXP_URL = require('../utils/regexp');

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
  }),
});

const validateAddItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    priceWithSale: Joi.number(),
    category: Joi.array().items(Joi.string().required()),
    inStockAmount: Joi.number().required(),
    images: Joi.array().items(Joi.string().required().pattern(REG_EXP_URL, { name: 'url' })),
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
};
