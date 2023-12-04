# Онлайн магазин продажи ключей для игр. Фронтенд и бэкенд.

## Описание
Репозиторий для пет-проекта, представляющего собой онлайн магазин, проект в первую очередь был посвящен изучению Redux Toolkit и RTK Query. Включает фронтенд и бэкенд части приложения. 

### Реализованы следующие составляющие приложения: 
* Каталог товаров (с пагинацией, фильтрацией по жанру и платформе, сортировкой по имени и цене).
* Корзина с возможностью редактирования добавленных в нее товаров, а так же страница оформления заказа.
* Страница профиля.
* Страница товара.
* Страница игр, входящих в одну серию.
* Страницы регистрации и авторизации.
* 404 страница

### Технические возможности и особенности
2. Авторизации и регистрация пользователей происходит с выдаче токена в http-only куки.
2. Присутствует возможность редактирования данных своего профиля - имя, email, пароль. 
3. Добавление игр в корзину реализовано с указанием желаемой платформы и количества. Имеется возможность купить ключи для нескольких платформ через страницу игры.
4. Все данные сохраняются в БД Mongo. Обращение к API реализованно с помощью асинхронных запросов.

Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 

## Стек технологий

* **Фронтенд** - HTML, CSS, TS, React, Redux Toolkit, RTK Query.
* **Бэкенд** - Node, JS, Express.js, Mongo DB.
  
## Запуск проекта 

1. Для начала требуется настроить url для связи фронтенда с бэкендом.
Для этого:
* `/frontend/src/utils/constants` - указываем в константе *BASE_URL_API* домен, на котором расположен бэкенд;
* `/backend/utils/origins` - указываем домен(ы), на котором расположен фронтенд (чтобы избежать ошибок CORS).

2. Для обоих частей приложения:
```
npm ci
```

3. Для фронтенда:
```
npm run build
```

4. Для бэкенда:
```
npm run start
```

(требуется установленная MongoDB)
