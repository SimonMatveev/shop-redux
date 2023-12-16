const router = require('express').Router();
const { setRating, resetRating, } = require('../controllers/itemsAndUsers');
const { validateSetRating, validateResetRating } = require('../middlewares/validate');

router.post('/', validateSetRating, setRating);
router.delete('/', validateResetRating, resetRating);

module.exports = router;
