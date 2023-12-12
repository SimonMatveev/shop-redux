const router = require('express').Router();
const { logout, login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validate');
const { NOT_FOUND_ERR } = require('../utils/constants');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.post('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/items', require('./items'));
router.use('/ratings', auth, require('./ratings'));

router.all('/*', auth, (req, res, next) => next(new NotFoundError(NOT_FOUND_ERR)));

module.exports = router;
