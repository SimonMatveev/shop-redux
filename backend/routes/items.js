const router = require('express').Router();
const {
  getItems, addItem, deleteItem, changePrice, changeInStock,
} = require('../controllers/items');
const auth = require('../middlewares/auth');
const { validateAddItem, validateDeleteItem, validateChangePrice, validateInStock } = require('../middlewares/validate');

router.get('/', getItems);
router.post('/', auth, validateAddItem, addItem);
router.delete('/:itemId', auth, validateDeleteItem, deleteItem);
router.patch('/:itemId/price', auth, validateChangePrice, changePrice);
router.patch('/:itemId/inStock', auth, validateInStock, changeInStock);

module.exports = router;
