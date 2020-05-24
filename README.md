## Страницы макета
* UI_Kit
  * [cards](https://grigorenkosergey.github.io/Second_Task/cards.html)
  * colors_and_type
  * form_elements
  * headers_and_footers
* Website_pages
  * landing_page
  * registrations
  * room_details
  * search_room
  * sign_in

## Установка
npm install
### Возможные проблемы
Поначалу выдавало ошибку. Пришлось переустановить babel-loader командами
npm uninstall babel-loader @babel/core @babel/preset-env 
npm install -D babel-loader @babel/core @babel/preset-env

Картинки, которые относятся не к блоку, а к непосредственно сайту, будем складывать в 
папку assets/images/(UI_Kit)|(Website_pages)/some_page/image.png. Связано это с настройками 
(точнее с их отсутствием) file-loader моего webpack.