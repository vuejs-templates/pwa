# vue-pwa-boilerplate

> A full-featured [PWA](https://developers.google.com/web/progressive-web-apps/) Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible. For Vue 1.x use this command: `vue init webpack#1.0 my-project`

## Documentation

- This template builds on top of the main webpack template, so please refer to the [webpack template docs](http://vuejs-templates.github.io/webpack).
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init pwa my-project
$ cd my-project
$ npm install
$ npm run dev
```

This will scaffold the project using the `master` branch. If you wish to use the latest version of the PWA template, do the following instead:

``` bash
$ vue init pwa#development my-project
```

:warning: **The `development` branch is not considered stable and can contain bugs or not build at all, so use at your own risk.**

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

## What's not Included

* You should configure your web server to add HTTP headers to prevent caching of critical service worker files.
If you don't do this, [browsers might cache the content for up to 24 hours](https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours/38854905#38854905).
In addition, you should add HTTP headers to prevent the contents of the static folder to be cached unintentionally long.

See ["Configuring your Web server to prevent caching"](docs/prevent_caching.md) in the docs for more information.

## What's Included

* Service Worker precaching of application shell + static assets (prod)
* Script (async chunk) preloading using `<link rel="preload">`
* Web Application Manifest + favicons
* Mobile-friendly meta-viewport
* Lighthouse score of 90+/100

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - Static assets compiled with version hashes for efficient long-term caching, and an auto-generated production `index.html` with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.
  - Generates a Service Worker for offline caching your static assets using [sw-precache-webpack-plugin](https://www.npmjs.com/package/sw-precache-webpack-plugin)

- `npm run unit`: Unit tests run in [JSDOM](https://github.com/tmpvar/jsdom) with [Jest](https://facebook.github.io/jest/), or in PhantomJS with Karma + Mocha + karma-webpack.
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mocking.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```

## Contributing

This project is a modified copy of the [`vue-webpack-boilerplate`](https://github.com/vuejs-templates/webpack) template.

While we welcome contributions from the community, please note that changes to configuration that is shared between this project and `vue-webpack-boilerplate` should be made against `vue-webpack-boilerplate` *first*.

Once the [upstream](https://stackoverflow.com/a/2739476/385997) PR is merged, please file an additional PR against this project making the equivalent changes. This will help ensure that the shared configuration does not diverge too much.

Any changes that are specific to this project—related to service workers, or other PWA functionality—do not need an equivalent upstream PR.
