## Как тестировать

### Введение

В нашем проекте мы используем Vitest тестовый фреймворк, потому что у нас уже есть TypeScript, Vite, ESM (type: module)
*Vitest работает на том же движке, поэтому почти не требует настройки.*

Чтобы добавить Vitest setup в наш проект:
1. использовала команды:

`npm install -D vitest`

`npm install -D jsdom`

Что такое jsdom?

По умолчанию Vitest запускается в Node environment, где нет:
- document
- window
- HTMLElement
Наш проект работает с DOM, jsdom эмулирует браузер:
```document.createElement('div')
document.querySelector('.app')
```

Поэтому теперь можно тестировать функции вроде:
- createElement
- UI компонентов
- рендеринга элементов

2. Добавлена строка в packaje.json

`"test": "vitest"`

3. Добавлен минимальный конфиг - vitest.config.ts
4. Добавлена папка test с примером тестового файла example.test.ts


### Как добавить настройки Vitest локально:

1. Запустить команды:

`git pull`

`npm install`

2. Проверить, что в папке src появилась папка tests. В папке tests есть файл с примерами тестов example.test.ts

3. Запустить команду

`npm test`

4. Если все настроено верно вы увидите примерный вывод:

[!example tests output](./assets/example-output.png)

5. Пишите ваши тесты в папку tests. Структура:

```src
 ├─ tests
 │   ├─ exaple.test.ts
 │   ├─ your.test.ts
 │   └─ anotheryour.test.ts
 ```
