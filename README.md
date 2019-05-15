## Задание

Создать веб-приложение TO-DO лист и разместить его в интернете.

#### Технические требования:
 - Возможность создания неограниченого количества заметок.
 - Заметки могут быть двух типов: 
   - карточка с названием (опционально) и текстом 
   - TO-DO список: название (опционально), перечень задач с чекбоксом для отметки того, что задача была выполнена. Выполненные задачи отображаются в самом низу списка.
 - Все запросы между клиентской и серверной частью производятся с помощью AJAX запросов.
 - Для разработки клиентской части необходимо использовать фреймворк [Bootstrap 4](https://getbootstrap.com/). Супер красивости не требуются, но дизайн должен быть акуратным и не вызывающим отторжение.
 - HTML код должен быть написан с помощью [Pug](https://pugjs.org/) шаблонов.
 - Верстка должна быть сделана только под мобильные девайсы. Верстка под широкоформатные экраны и адаптив не обязательны.
 - Сервер должен быть подключен к базе MongoDB.
 

 - Frontend:
   - Базовая архитектура приложения.
   - Pug-шаблон HTML страницы вывода всех заметок, с возможностью перехода к конкретной заметке при клике на нее.
   - Pug-шаблон HTML страницы создания заметки.
   - Отправка POST запроса на сервер с созданием заметки. После ответа сервера пользователь должен быть перенаправлен на главную страницу.
   - Pug-шаблон HTML страницы детального отображения заметки. На этой странице должна быть возможность отредактировать и удалить заметку.
   - Отправка PUT запроса на сервер с отредактированной заметкой. После ответа сервера пользователь должен быть перенаправлен на главную страницу.
   - Отправка DELETE запроса на сервер для удаления заметки. После ответа сервера пользователь должен быть перенаправлен на главную страницу.
   - Pug-шаблон HTML страницы создания списка.
   - Отправка POST запроса на сервер с созданием списка. После ответа сервера пользователь должен быть перенаправлен на главную страницу.
   - Pug-шаблон HTML страницы детального отображения списка. На этой странице должна быть возможность отредактировать и удалить список.
   - Отправка PUT запроса на сервер с отредактированным списком. После ответа сервера пользователь должен быть перенаправлен на главную страницу.
   - Отправка DELETE запроса на сервер для удаления списка. После ответа сервера пользователь должен быть перенаправлен на главную страницу.

 - Backend:
   - Базовая архитектура приложения, подключение необходимых модулей.
   - Роут GET `/`, который будет возвращать главную HTML страницу со всеми заметками.
   - Роут GET `/notes`, который будет отдавать HTML страницу с формой создания заметки.
   - Роут GET `/notes/${id}`, который будет отдавать HTML страницу детального отображения заметки.
   - Роут POST `/api/notes` для создания заметки.
   - Роут PUT `/api/notes/${id}` для редактирования заметки.
   - Роут DELETE `/api/notes/${id}` для удаления заметки.
   - Роут GET `/lists`, который будет отдавать HTML страницу с формой создания списка.
   - Роут GET `/lists/${id}`, который будет отдавать HTML страницу детального отображения списка.
   - Роут POST `/api/lists` для добавления нового списка задач с учетом того, что количество позиций в списке - не ограничено и заранее не известно.
   - Роут PUT `/api/lists/${id}` для редактирования списка задач.
   - Роут DELETE `/api/lists/${id}` для удаления заметки со списком.
   - Юнит-тесты.