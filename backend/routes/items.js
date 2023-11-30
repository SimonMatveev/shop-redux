const router = require('express').Router();
const {
  getItems, addItem, deleteItem, changePrice, changeInStock, getItem, getSeries, getSeriesList,
} = require('../controllers/items');
const auth = require('../middlewares/auth');
const { validateAddItem, validateDeleteItem, validateChangePrice, validateInStock, validateGetItem, validateGetSeries } = require('../middlewares/validate');

router.get('/', getItems);
router.get('/series/list', getSeriesList);
router.get('/series/:seriesId', validateGetSeries, getSeries);
router.get('/:itemId', validateGetItem, getItem);
router.post('/', auth, validateAddItem, addItem);
router.delete('/:itemId', auth, validateDeleteItem, deleteItem);
router.patch('/:itemId/price', auth, validateChangePrice, changePrice);
router.patch('/:itemId/inStock', auth, validateInStock, changeInStock);

module.exports = router;
