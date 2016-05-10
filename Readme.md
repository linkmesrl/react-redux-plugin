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

A plugin is installed as a generic npm package. However we still have to mark them as plugins in order for this to work.
This is accomplished by listing them in a custom array inside the package.json file.

```javascript
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
  return require('PATH_TO_PLUGIN/' + plugin + '/settings.js')
});
```

And saves them in the redux store via a custom action
```javascript
actions.addPlugins(plugins);
```
Every plugin it has a file `settings.js` where all dependencies are declared.
For example Maps plugin it will be an array of object with component and path properties.

```javascript
import MapsDashboards from './dashboard'
import MapsMain from './main'
import MapsMenu from './index'

export const components = [{
  component: MapsDashboards,
  path: 'dashboard',
}, {
  component: MapsMain,
  path: 'main',
}, {
  component: MapsMenu,
  path: 'menu',
}];
```

It will be the component itself to load plugins' components tagged for it.

*SideBar* will load plugins tagged with 'menu' in path and it will create a dynamic menu.

*Dashboard* is a plugin itself but it can load plugins' components tagged with 'dashboard' in path and generate a dynamic list of widgets.

In this POC every plugins have a menu item with an `onClick` handler that show a component associated in the *MainSection*. They can have also a widget that it'll be loaded in *Dashboard*.

## Plugin's Lazy Loading

Using Webpack [**bundle-loader**](https://github.com/webpack/bundle-loader) is it possible to load plugins dynamically in a different bundle.

```javascript
const waitForChunk = require('bundle?lazy!PATH_TO_PLUGIN/Orders/settings.js')

waitForChunk((file) => {
  const newPlugin = file.components
  actions.addPlugins(newPlugin);
});
```

In this example you can click on the Add Order button to load a new bundle that import a new menu item with its child.
