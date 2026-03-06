# Где хранить картинки, шрифты

##  В большинстве Vite-проектов структура такая:

```src
 └─ assets
     ├─ images
     ├─ fonts
     └─ icons
```

## Куда положить картинки

*В проектах на Vite с TypeScript обычно используют два варианта размещения изображений, в зависимости от того, как они используются.*

1. Чаще всего — src/assets (рекомендуется)

**Если изображения используются внутри кода или CSS, их лучше хранить в src.**

Пример структуры:

```src
 ├─ assets
 │   ├─ images
 │   │   ├─ hero.jpg
 │   │   └─ logo.png
 │   └─ fonts
 ├─ css
 ├─ scripts
 └─ main.ts
```

Пример использования в TypeScript
```import hero from "../assets/images/hero.jpg";

const img = document.createElement("img");
img.src = hero;
```

в CSS

```background-image: url("../assets/images/hero.jpg");```

Что делает Vite:
  - оптимизирует файлы
  - добавляет hash к имени
  - корректно кладёт их в dist.

2. public — для полностью статических файлов

Используйте public, если:
  - файл должен иметь фиксированный URL
  - он не импортируется в коде
  - на него есть прямая ссылка

Пример:
```public
 ├─ images
 │   └─ og-image.png
```

Использование:

`<img src="/images/og-image.png">`

**Файл просто копируется в dist без обработки.**


## Куда положить шрифты

**В проектах на Vite (в том числе с TypeScript) шрифты обычно кладут в src, а не в public.**

Рекомендуемый вариант:

```src
 ├─ css
 │   └─ styles.css
 ├─ assets
 │   └─ fonts
 │       ├─ Inter-Regular.woff2
 │       └─ Inter-Bold.woff2
 ├─ scripts
 └─ main.ts
```

И подключайте их в CSS:

```@font-face {
  font-family: "Inter";
  src: url("../assets/fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
```


## Почему src лучше

Vite обрабатывает файлы
Шрифты могут:
  - хэшироваться (font.ab12cd.woff2)
  - оптимизироваться
  - корректно попадать в dist.
  - Работают относительные импорты из CSS
  - Лучше интеграция с сборкой


## Когда использовать public

**Папка public подходит для статических файлов, которые должны копироваться как есть, например:**
  - favicon
  - большие статические JSON
  - изображения, на которые ссылаются напрямую

Файл из public будет доступен так:

`/fonts/font.woff2`

**Но он не пройдет через сборку.**


### Простое правило
| Тип использования |	Куда класть |
|-----------------|------------|
| используется в JS / TS |	src/assets |
| используется в CSS |	src/assets |
| просто статический URL |	public |

