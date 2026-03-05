# Настройки проекта

Используется строгий TypeScript, чтобы избежать any и скрытых ошибок.


## Команды package.json

**Запуск проекта в режиме разработки:**

`npm run dev`



**Создание production-сборки (папка dist):**

`npm run build`



**Локальный запуск production-версии:**

`npm run preview`



**Проверка кода на ошибки стиля и потенциальные проблемы:**

`npm run lint`



**Автоматическое исправление мелких ошибок:**

`npm run lint:fix`



**Форматирование кода через Prettier:**

`npm run format`



**Команды перед коммитом:**

`npm run check` - запускает ESLint и проверяет типы TypeScript



## devDependencies

```"devDependencies": {
  "@typescript-eslint/eslint-plugin": "...",
  "@typescript-eslint/parser": "...",
  "eslint": "...",
  "eslint-config-prettier": "...",
  "husky": "...",
  "prettier": "...",
  "typescript": "...",
  "vite": "..."
}
```

Объяснение:

vite -	сборщик

typescript -	типизация

eslint -	проверка кода

prettier -	форматирование

husky	git hooks - запускает ESLint перед каждым коммитом, что предотвращает добавление кода с ошибками в репозиторий

@typescript-eslint -	интеграция ESLint + TS



## Конфигурация TypeScript.

tsconfig.json:

1. `"target": "ES2020"` - код компилируется в стандарт ES2020.
2. `"module": "ESNext"` - используем современную систему модулей:
  
  `import ...`

  `export ...`

3. `"lib": ["ES2020", "DOM"]`
ES2020 → стандарт JS

DOM → работа с document, window и браузером

Без "DOM" TypeScript ругался бы на: `document.getElementById(...)`

4. `"moduleResolution": "bundler"` - Разрешает модули так, как это делает сборщик (Vite)

5. `"resolveJsonModule": true` Позволяет делать:
  `import questions from './data/questions.json';`

6. `"noEmit": true` - TypeScript не создаёт .js файлы, потому что компиляцией занимается Vite.
TS только проверяет типы.

7. Включает максимально строгую типизацию:

  ```"strict": true,
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
  ```

      - `strict: true` - строгий режим,
      - `noImplicitAny: true` - тип any запрещен
      - `noUnusedLocals` - запрет на неиспользуемые переменные
      - `noUnusedParameters` запрет лишних аргументов в функциях
      - `noFallthroughCasesInSwitch` - срабатывает тогда, когда в case нет break, return, throw или другого завершения — и выполнение «проваливается» в следующий case.
  
      если fallthrough сделан намеренно, можно написать комментарий:

      ```case 1:
        console.log('one');
        // falls through
      case 2:
        console.log('two');
        break;
      ```
      *TypeScript это допускает, если есть специальный комментарий.*

      - `"include": ["src"]` - TypeScript проверяет только папку src.


## Конфигурация ESLint
- подключает ESLint к TypeScript
- включает готовые рекомендованные правила
- добавляет дополнительные строгие проверки

#### Импорты
- `import tseslint from "@typescript-eslint/eslint-plugin"`; - позволяет ESLint понимать TypeScript
- `import parser from "@typescript-eslint/parser"`; - содержит правила для TS
Без parser ESLint не сможет анализировать .ts файлы.

#### Экспорт конфигурации
  ```export default [
    {
      files: ["**/*.ts"],
  ```
Это означает, что правила применяются только к .ts файлам.

#### languageOptions
  ```languageOptions: {
    parser,
    parserOptions: {
      project: "./tsconfig.json"
    }
  }
  ```
 `project: "./tsconfig.json"` - ESLint читает tsconfig, понимает типы, может ловить более сложные ошибки

#### Подключение плагина
  ```plugins: {
    "@typescript-eslint": tseslint
  }
  ```
Мы регистрируем TypeScript-плагин.

#### Подключение рекомендованных правил
- `...tseslint.configs.recommended.rules`,
- `...tseslint.configs["recommended-type-checked"].rules`,

recommended - Базовые правила для TypeScript.

recommended-type-checked - Правила, которые требуют анализа типов
работают только если указан project

- `"@typescript-eslint/no-explicit-any": "error"` - запрещает any

- `"@typescript-eslint/no-unused-vars": "error"` - ошибка если переменная объявлена, но не используется

- `"@typescript-eslint/explicit-function-return-type": "warn"` - требует явного указания типа возвращаемого значения:

  ```function sum(a: number, b: number): !!! {
    return a + b;
  }
  ```
