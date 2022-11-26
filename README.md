 [![Tests](https://github.com/Olga-Soloveva/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Olga-Soloveva/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## Описание
Mesto: интерактивная страница с возможностью размещать фотографии, удалять их и ставить лайки.
Cайт сделан в рамках обучения по професии "Веб разработчик" в Яндекс Практикуме.

Ссылка на репозиторй: [https://github.com/Olga-Soloveva/express-mesto-gha]

## Функциональность проекта
__Стэк__: Express.js, MongoDB
 
* Создана база данных MongoDB
* Cервер развернут через Express.js. 
* Связь с фронтендом через REST API
* Бэкенд производит регистрацию и авторизацию пользователей, редактирование данных пользователя, создание и удаление карточек.

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
