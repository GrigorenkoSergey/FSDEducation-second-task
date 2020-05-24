## Страницы макета
* UI_Kit
  * [cards](https://grigorenkosergey.github.io/Second_Task/cards.html)
  * [colors_and_type](https://grigorenkosergey.github.io/Second_Task/colors_and_type.html)
  * [form_elements](https://grigorenkosergey.github.io/Second_Task/form_elements.html)
  * [headers_and_footers](https://grigorenkosergey.github.io/Second_Task/headers_and_footers.html)
* Website_pages
  * [landing_page](https://grigorenkosergey.github.io/Second_Task/landing_page.html)
  * [registrations](https://grigorenkosergey.github.io/Second_Task/registrations.html)
  * [room_details](https://grigorenkosergey.github.io/Second_Task/room_details.html)
  * [search_room](https://grigorenkosergey.github.io/Second_Task/search_room.html)
  * [sign_in](https://grigorenkosergey.github.io/Second_Task/sign_in.html)

## Установка и возможные проблемы
`npm install`  
Поначалу выдавало ошибку. Пришлось переустановить babel-loader командами
npm uninstall babel-loader @babel/core @babel/preset-env 
npm install -D babel-loader @babel/core @babel/preset-env

## Структура проекта
Картинки, которые относятся не к блоку, а к непосредственно сайту, будем складывать в 
папку assets/images/(UI_Kit)|(Website_pages)/some_page/image.png. Связано это с настройками 
(точнее с их отсутствием) file-loader моего webpack.