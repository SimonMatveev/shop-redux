const router = require('express').Router();
const {
  getUsers, getCurrentUser, updateUser, incrementCart, decrementCart,
} = require('../controllers/users');
const { validatePatchMe, validateCart } = require('../middlewares/validate');

router.get('/', getUsers);
router.post('/cart/add', validateCart, incrementCart);
router.post('/cart/remove', validateCart, decrementCart);
router.get('/me', getCurrentUser);
router.patch('/me', validatePatchMe, updateUser);

module.exports = router;
