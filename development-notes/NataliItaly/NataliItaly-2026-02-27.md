## 27.02.2026

Deploy project on Netlify.

 - First deploy was failed:

Netlify Build Error (MODULE_NOT_FOUND)

Relevant lines:

`Build command invoked: npm run build`

`Error thrown: Error: Cannot find module '@rollup/rollup-linux-x64-gnu'`

`Node version on Netlify: v22.22.0`

### Diagnosis:

  - Rollup’s native loader tried to load an optional platform-specific package (@rollup/rollup-linux-x64-gnu) but it was missing.

  - The issue occurs when optional native dependencies are not installed correctly or when the lockfile was generated on a different platform (e.g., Windows vs. Linux).


### Solution (summary):

  - Ensure package.json and package-lock.json are committed and up-to-date.

  - Prefer using an LTS Node version supported by Netlify (Node 18 or 20) via .nvmrc or "engines" in package.json.

  - Remove node_modules and package-lock.json, then reinstall dependencies locally:

`Remove-Item -Recurse -Force node_modules package-lock.json`
`npm install`


### Commit the regenerated package-lock.json.
  - Clear Netlify build cache and redeploy (“Retry without cache”).
  - Optional: add a postinstall script in package.json to rebuild native modules:

```"scripts": {
  "postinstall": "npm rebuild || true",
  "build": "vite build"
}
```


### Cause summary:

  - Rollup optional native bindings were missing at build time.

  - Aligning Node version and reinstalling dependencies typically resolves the issue.


Second deploy was successful, [project link](https://smart-quiz-rsschool-auto-team-7.netlify.app/)

Add brief instruction about deploy process on Netlify
[Instruction for team members](https://github.com/NataliItaly/Smart-Quiz/blob/main/instructions/how-to-deploy.md)
