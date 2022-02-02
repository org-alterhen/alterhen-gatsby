# a\terHEN

### A Gatsby powered informational website and exhibition platform for a\terHEN

### Built with Gatsby + Netlify CMS Starter

## Dev Features

- A simple landing page with blog functionality built with Netlify CMS
- Editable Pages: Landing, About, Product, Artist-Collection and Contact page with Netlify Form support
- Create Artist posts from Netlify CMS
- Tags: Separate page for posts under each tag
- Basic directory organization
- Uses Bulma for styling, but size is reduced by `purge-css-plugin`
- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- Separate components for everything
- Netlify deploy configuration
- Netlify function support, see `lambda` folder
- Perfect score on Lighthouse for SEO, Accessibility and Performance (wip:PWA)
- ..and more

## Prerequisites

- git
- NodeJS v16 - use [nvm](https://github.com/nvm-sh/nvm) to manage node versions easily
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)
- [Netlify CLI](https://github.com/netlify/cli)

### Develop Locally

Pulldown a local copy of the Github repo and install dependancies:

```
$ git clone git@github.com:kylegrover/alterhen-gatsby.git
$ cd alterhen-gatsby
$ nvm use # Skip this if you have node v16 manually installed
$ npm install
```

Run the development server:

```
$ cd alterhen-gatsby
$ npm run develop
```

In another terminal session, run the local proxy server. This allows us to test the CMS changes locally without persisting to production:

```
$ cd alterhen-gatsby
$ npx netlify-cms-proxy-server
```

View the frontend: http://localhost:8000/
Access the CMS at: http://localhost:8000/admin/

### Media Libraries

The site uploads run to uploadcare, but it also accepts url inputs, including ipfs gateways.

Runs Uploadcare's Adaptive Resizing

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')

MacOS users might also encounter some errors, for more info check [node-gyp](https://github.com/nodejs/node-gyp). We recommend using the latest stable node version.

## Purgecss

This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.
