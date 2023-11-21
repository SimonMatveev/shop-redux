const router = require('express').Router();
const {
  getItems, addItem, deleteItem, changePrice, changeInStock, getItem,
} = require('../controllers/items');
const auth = require('../middlewares/auth');
const { validateAddItem, validateDeleteItem, validateChangePrice, validateInStock, validateGetItem } = require('../middlewares/validate');

router.get('/', getItems);
router.get('/:itemId', validateGetItem, getItem);
router.post('/', auth, validateAddItem, addItem);
router.delete('/:itemId', auth, validateDeleteItem, deleteItem);
router.patch('/:itemId/price', auth, validateChangePrice, changePrice);
router.patch('/:itemId/inStock', auth, validateInStock, changeInStock);

module.exports = router;
