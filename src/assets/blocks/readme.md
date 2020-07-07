Иногда к стандартному блоку необходимо добавить модификаторы. 

В общем случае миксины вызываются так:
```+mixin mixinName(obj)```
К объекту, переданному в миксин добавляем свойство extraClasses общего вида:
```js
obj.extraClasses = {
    item_1Class: "string of classes",
    item_2Class: "another string of classes",
    ...
    item_nClass: "last string of classes"
}
```
Далее в расширяемый миксин добавляем строчки:
```js
    - let { extraClasses = {} } = obj;
    - let {item_1Class = "", item_2Class = "", ...,  item_nClass = ""} = extraClasses;
```
Затем в каждый item добавляем ```(class= item_nClass)```

В некоторые блоки я добавил эту возможность *(buns, dropdown)*, в большинстве случаев проигнорировал. 
Все-таки вряд ли я буду переиспользовать данные блоки много раз. 

Забавно, ***width: 100%*** вовсе не всегда равна ***width: inherit*** для абсолютно позиционированных элементов, когда родителю задана ширина в пикселях.