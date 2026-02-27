## 26.02.2026

Netlify errors:
Relevant error lines

Build command invoked: line 51 and the build script start at line 53.
The thrown error: line 55–line 59 (Error: Cannot find module @rollup/rollup-linux-x64-gnu).
Underlying require error / stack: line 69–line 84.
Node version used on Netlify: line 86.
Diagnosis

Error type: MODULE_NOT_FOUND thrown by Rollup’s native loader.
Cause: Rollup attempts to load an optional native binding package for the platform (@rollup/rollup-linux-x64-gnu) but it is missing / not installed. The Rollup native loader reports this as an npm optional-dependency installation problem (the log even references an npm bug). Netlify is running Node v22.22.0 which can surface this issue if the lockfile/optional deps were not installed correctly or if a prebuilt native optional dependency is not available for the environment.
Solution (step-by-step)

Quick checks (do these first)

Verify package.json and package-lock.json are committed in the repo root:
package.json: https://github.com/NataliItaly/Smart-Quiz/blob/main/package.json
If you rely on package-lock.json, ensure it is up-to-date with your locally working install.
Preferred / safe fix: use an LTS Node version on Netlify

Many CI issues with optional native packages are avoided by using Node 18 or 20. Add a .nvmrc file containing the Node major version (example uses 18), commit it and redeploy:
18
Or set engines in package.json:
"engines": {
  "node": "18.x"
}
After committing, clear Netlify build cache and redeploy (Netlify UI: Deploys → Trigger deploy → Clear cache and deploy).
Documentation for changing Node versions on Netlify: https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript
If Node change alone does not fix it, refresh/install cleanly

Locally (or on CI): remove node_modules and lockfile, install afresh to regenerate a correct lockfile:
rm -rf node_modules package-lock.json
npm install
Commit the updated package-lock.json and push, then redeploy on Netlify (with a cleared cache).
If the missing optional native package continues to fail to install at build time, try a rebuild step on Netlify

Add a postinstall script in package.json to force rebuild of native modules:
"scripts": {
  "postinstall": "npm rebuild || true",
  "build": "vite build"
}
Commit and redeploy (clear cache).
Last resort: explicitly install the platform-specific rollup package (only if previous steps fail)

First verify the package you are going to add is present in package.json or that you intend to add it (do not add blindly).
Then add the package (example — install without saving to package.json if you prefer):
npm install @rollup/rollup-linux-x64-gnu --no-save
Or add it as a normal dependency and commit package.json (only do this after confirming it’s necessary).
Why these steps

The error is caused by Rollup’s optional native bindings not being present at build time. The most typical, reliable fix is aligning the Node version to an LTS release Netlify supports (via .nvmrc or engines) and forcing a clean install so optional dependencies are resolved correctly. If that doesn't resolve it, forcing a rebuild or explicitly installing the native package are fallback workarounds.
If you want, I can:

Inspect your package.json and package-lock.json in the repo and recommend the exact edits to add (.nvmrc or engines) or prepare a commit patch to apply.