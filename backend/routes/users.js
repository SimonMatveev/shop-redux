const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  updateUser,
  incrementCart,
  decrementCart,
  clearCart,
} = require('../controllers/users');
const { validatePatchMe, validateCart } = require('../middlewares/validate');

router.get('/', getUsers);
router.post('/cart/add', validateCart, incrementCart);
router.post('/cart/remove', validateCart, decrementCart);
router.delete('/cart/clear', clearCart);
router.get('/me', getCurrentUser);
router.patch('/me', validatePatchMe, updateUser);

module.exports = router;
