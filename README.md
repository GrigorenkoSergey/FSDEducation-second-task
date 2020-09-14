# FSDEducation-second-task
## [Результат](https://grigorenkosergey.github.io/Second_Task/index.html)

## Установка и возможные проблемы
Клонируй одним из возможных способов:  
`git clone https://github.com/GrigorenkoSergey/FSDEducation-second-task.git`  
`git clone git@github.com:GrigorenkoSergey/FSDEducation-second-task.git`  
Или просто скачай [ZIP архив](`https://github.com/GrigorenkoSergey/FSDEducation-second-task/archive/master.zip`).

Развертывание. Зайди в установленную директорию (*FSDEducation-second-task*) и выполни команду
`npm install`  
Если выдаст ошибку, попробуй переустановить ***babel-loader*** командами  
`npm uninstall babel-loader @babel/core @babel/preset-env`  
`npm install -D babel-loader @babel/core @babel/preset-env`

Запуск webpack-dev-server  
`npm run dev`  
Запуск production build  
`npm run build`

## Структура проекта
```
.
├── dist
├── node_modules
├── src
|   ├── assets
|   |   ├── blocks
|   |   ├── fonts
|   |   └── images
|   |
|   ├── favicons
|   |
|   └── pages
|   |   ├── UI-Kit
|   |   |   ├── cards
|   |   |   |── colors-and-type
|   |   |   ├── form-elements
|   |   |   ├── headers-and-footers
|   |   |   └── UI-Kit-common
|   |   | 
|   |   └── Website-pages
|   |       ├── landing-page
|   |       ├── registration
|   |       ├── room-details
|   |       ├── search-room
|   |       ├── sign-in
|   |       └── Website-pages-common
|   |
|   ├── index.js
|   ├── index.pug
|   ├── postcss.config.js
|   └── screens.txt
|   
├── README.md
├── package.json
├── webpack.dev.config.js
└── webpack.prod.config.js
```

## Сторонние библиотеки
  [bxslider 4.2.14](https://github.com/stevenwanderski/bxslider-4)

  [jquery 3.5.1](https://jquery.com/)

  [air-datepicker 2.2.3](http://t1m0n.name/air-datepicker/docs/index-ru.html)

**Примечания:**  
При импорте из scss-файл нужно указывать относительный путь именно от этого файла.
Картинки, которые относятся к блокам будут содержаться непосредственно в папке images каждого блока.  
При вставке изображений в pug-файле мы не можем в полной мере поместить путь в переменную с использованием **img(src=require("...")** в текущей версии pug-loader. В переменных мы не имеем права указывать знак "/", иначе выскочит ВЕСЬМА СУРОВАЯ ошибка )).

Для капитального увеличения скорости загрузки общий код страниц поместим в UI-Kit-common и Website-pages-common (в частности подключение общего кода из template). В итоге у нас будет несколько очень маленьких файлов, которые будут подгужаться по мере необходимости. 