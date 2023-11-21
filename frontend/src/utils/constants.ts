import { ENUM_CATEGORY, ENUM_PLATFORMS } from "../types/types";

export const REG_EXP_EMAIL = '[\\-А-Яа-яA-Za-z0-9.]+@[\\-А-Яа-яA-Za-z0-9.]+\\.[а-яА-Яa-zA-Z]{2,}';
export const REG_EXP_NAME = '[\\-А-Яа-яA-Za-z ]+';
export const REG_EXP_PASSWORD = '[\\-А-Яа-яA-Za-z0-9\\.!?+@\\, ]+';
export const EMAIL_VALIDATION_MSG = 'Введите правильный email';
export const NAME_VALIDATION_MSG = 'Только латиница, кириллица, пробелы или дефисы';
export const DEFAULT_VALIDATION_MSG = 'Ошибка валидации';

export const CHECKOUT_PATHNAME = '/checkout';

export const MENU_ANIMATION_DELAY = 300;

export const CATEGORIES = [
  {
    id: ENUM_CATEGORY.ACTION,
    name: 'Экшн',
  },
  {
    id: ENUM_CATEGORY.FIRST_PERSION,
    name: 'Игры от первого лица',
  },
  {
    id: ENUM_CATEGORY.HORROR,
    name: 'Хорроры',
  },
  {
    id: ENUM_CATEGORY.IMMERSIVE_SIM,
    name: 'Иммёрсив сим',
  },
  {
    id: ENUM_CATEGORY.RACING,
    name: 'Гонки',
  },
  {
    id: ENUM_CATEGORY.RPG,
    name: 'РПГ',
  },
  {
    id: ENUM_CATEGORY.SHOOTER,
    name: 'Шутеры',
  },
  {
    id: ENUM_CATEGORY.SIMULATOR,
    name: 'Симуляторы',
  },
  {
    id: ENUM_CATEGORY.SOULS_LIKE,
    name: 'Соулс-лайк',
  },
  {
    id: ENUM_CATEGORY.SURVIVAL,
    name: 'Выживание',
  },
  {
    id: ENUM_CATEGORY.THIRD_PERSON,
    name: 'Игры от третьего лица',
  },
  {
    id: ENUM_CATEGORY.VN,
    name: 'Визуальные новеллы',
  },
]

export const PLATFORMS = [
  {
    id: ENUM_PLATFORMS.PC,
    name: 'PC'
  },
  {
    id: ENUM_PLATFORMS.PS4,
    name: 'PlayStation 4'
  },
  {
    id: ENUM_PLATFORMS.PS5,
    name: 'PlayStation 5'
  },
  {
    id: ENUM_PLATFORMS.XBOX_ONE,
    name: 'XBOX One'
  },
  {
    id: ENUM_PLATFORMS.XBOX_X,
    name: 'XBOX X'
  },
  {
    id: ENUM_PLATFORMS.SWITCH,
    name: 'Nintendo Switch'
  },
]
