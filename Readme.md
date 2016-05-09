# React redux plugin POC

A proof of concept for a React application that demonstrates a simple plugin system that allows components to have a dynamic list of child components.

A plugin is just a collection of components that implement a specific functionality.


## What's inside

- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Babel](https://babeljs.io/)

## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## How does it work

Plugin deps

A plugin is installed as a generic npm package. However we still have to mark them as plugins in order for this to work.
This is accomplished by listing them in a custom array inside the package.json file.


"plugins": [
  "Settings",
  "Clients",
  "Maps"
],
```

Webpack reads the array with plugins and set constant *EXTERNAL_PLUGINS* to make them available in the app flow.

```javascript
new webpack.DefinePlugin({
  EXTERNAL_PLUGINS: JSON.stringify(require("./package.json").plugins)
})
```

### Plugin bootstrapping

The *App* root component dynamically requires all defined plugins during the boot phase
```javascript
const plugins = EXTERNAL_PLUGINS.map(plugin => {
  return require('components/' + plugin + '/index.js').default
});
```

And saves them in the redux store via a custom action
```javascript
actions.addPlugins(plugins);
```

At this point we have plugins in the app state and we can pass them via props to child components, *SideBar* for example to build a dynamic menu.

In this POC plugins are menu items with a onClick handler that show a component associated in the main section. Basically a simple different h1

Every plugin can import their own children, the application shouldn't know every component loaded.

## Plugin's Lazy Loading

Using Webpack [**bundle-loader**](https://github.com/webpack/bundle-loader) is it possible to load plugins dynamically in a different bundle.

```javascript
const plugin = 'Orders';
const waitForChunk = require('bundle?lazy!./../../../plugins/Orders/index.js')

waitForChunk((file) => {
  const newPlugin = file.default
  actions.addPlugins([newPlugin]);
});
```

In our example you can click on the Add Order button to load a new bundle that import a new menu item with its child.
