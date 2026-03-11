## 11.03.2026

1. Correct Filters form UI.

Point to discuss:
  - Do we need submit form or it's enough apply select change?
  - Do current Quiz must be rendered from state? If user click 'Back' button and than will return back to quiz what will he see - new quiz or current quiz?
  - Do we need to add questions quantity limit or the limited quantity of choosen question is enough?
  - What about styles?

2. Working on Vitest settings.
- Vitest test framework was choosen because of full compatiility with TS and Vite
- Installation:
  
`npm install -D vitest`

`npm install -D jsdom`

- Add  `"test": "vitest run",` to package.json
- Create vitest.config.ts file.
Eslint error:

>Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vitest.config.ts`
>using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
>However, that TSConfig does not include this file. Either:
>- Change ESLint's list of included files to not include this file
>- Change that TSConfig to include this file
>- Create a new TSConfig that includes this file and include it in your parserOptions.project
>See the typescript-eslint docs for more info: https://tseslint.com/none-of-

Error meaning: *ESLint checks the vitest.config.ts file, but this file is not included in tsconfig.json, so the parser swears.*
- Resolve with adding include: ["*.ts"] in tsconfig.json and run command `npm install -D jsdom`
- Why jsdom is needed: **By default, Vitest runs in the Node environment**, where there is no:
  - document
  - window
  - HTMLElement
**jsdom emulates browser**

3. Add tests instruction for team members:
[test-flow.md](https://github.com/NataliItaly/Smart-Quiz/blob/main/instructions/tests-flow.ts)
