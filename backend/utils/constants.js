const GET_USER_ERR = 'Передан некоректный _id.';
const CREATE_USER_ERR = 'Переданы некорректные данные при создании пользователя.';
const PATCH_USER_ERR = 'Переданы некорректные данные для редактирования профиля пользователя.';
const LOGIN_ERR = 'Неправильные почта или пароль';
const ADD_ITEM_ERR = 'Переданы некорректные данные для добавления товара.';
const DEL_ITEM_NOT_FOUND_ERR = 'Товара с переданным _id не существует.';
const DEL_ITEM_NOT_OWN_ERR = 'Товар не ваш!';
const DEL_ITEM_WRONG_ID_ERR = 'Передан некорректный _id товара.';
const DEL_ITEM_VALIDATION_ERR = 'Переданы некорректные данные для удаления товара.';
const NOT_FOUND_ERR = 'Страницы не существует';
const EMAIL_ERR = 'Пользователь с таким email уже зарегистрирован';
const AUTH_ERR = 'Необходима авторизация';
const TOKEN_ERR = 'Неверный токен!';

const LOGOUT_MSG = 'Успешно разлогинены!';

const AUTH_ERR_STATUS = 401;
const DATA_ERR_STATUS = 400;
const DEL_ERR_STATUS = 403;
const NOT_FOUND_ERR_STATUS = 404;

const CATEGORY_ENUM = [
  'RPG',
  'ACTION',
  'IMMERSIVE-SIM',
  'VN',
  'SOULS-LIKE',
  '3RD-PERSON',
  '1ST-PERSON',
  'SHOOTER',
  'RACING',
  'SIMULATOR',
  'SURVIVAL',
  'HORROR',
];

const PLATFORM_ENUM = ['PC', 'PS4', 'PS5', 'XBOX-ONE', 'XBOX-X', 'Switch'];

module.exports = {
  GET_USER_ERR,
  CREATE_USER_ERR,
  PATCH_USER_ERR,
  LOGIN_ERR,
  ADD_ITEM_ERR,
  DEL_ITEM_NOT_FOUND_ERR,
  DEL_ITEM_NOT_OWN_ERR,
  DEL_ITEM_WRONG_ID_ERR,
  DEL_ITEM_VALIDATION_ERR,
  LOGOUT_MSG,
  NOT_FOUND_ERR,
  EMAIL_ERR,
  AUTH_ERR_STATUS,
  DATA_ERR_STATUS,
  DEL_ERR_STATUS,
  NOT_FOUND_ERR_STATUS,
  AUTH_ERR,
  TOKEN_ERR,
  CATEGORY_ENUM,
  PLATFORM_ENUM,
};
