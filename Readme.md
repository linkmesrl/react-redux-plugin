# React redux plugin

Un proof of concept di una struttura a plugin per una applicazione react

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

## How is it work

Nel file package.json alcune dipendenze possono essere specificate anche dentro l'array *plugins*. Questo marca queste dipendenze come plugin compatibili con il sistema descritto in seguito, ciò non toglie che questi plugin saranno gestibili come pacchetti npm indipendenti.

```json
"plugins": [
  "Settings",
  "Clients",
  "Maps"
],
```
Attraverso webpack viene letto l'array dei plugin e messo in una costante *EXTERNAL_PLUGINS* che sarà disponibile nell'applicazione.

```javascript
new webpack.DefinePlugin({
  EXTERNAL_PLUGINS: JSON.stringify(require("./package.json").plugins)
})
```

*App*, che è il nostro componente connesso con lo stato di redux, legge la costante EXTERNAL_PLUGINS e richiede i plugin durante la fase di boot dell'applicazione
```javascript
const plugins = EXTERNAL_PLUGINS.map(plugin => {
  return require('components/' + plugin + '/index.js').default
});
```
Successivamente salva i nostri plugin nello stato di redux
```javascript
actions.addPlugins(plugins);
```
A questo punto, il nostro redux store è informato dei plugin che sono presenti.

Per esempio, un plugin che voglia aggiungere una voce al menu dell'applicazione, può passare tramite props il componente che implementa questa voce di menu al componente builtin *SideBar*

In questo POC i plugin sono fondamentalmente delle voci di menu a cui è associato un altro
componente che viene visualizzato nella sezione principale.

Ogni plugin caricato nella sidebar può essere associato una serie di componenti dipendenti, in questo caso cliccando su un elemento della sidebar viene caricato il componente selezionato in *MainSection*, nel nostro esempio viene caricato un h1 diverso.

## Plugin's Lazy Loading

Utilizzando [**bundle-loader**](https://github.com/webpack/bundle-loader) di webpack è possibile ottenere il caricamento Lazy dei plugin che quindi, inizialmente non fanno parte del bundle ma vengono caricati dinamicamente in un secondo momento.

```javascript
const plugin = 'Orders';
const waitForChunk = require('bundle?lazy!./../../../plugins/Orders/index.js')

waitForChunk((file) => {
  const newPlugin = file.default
  actions.addPlugins([newPlugin]);
});
```

Schiacciando sul bottone Add Order in alto a destra del POC, viene caricato un nuovo bundle js che aggiunge una nuova voce di menu, Orders nel nostro caso, caricando anche il suo componente figlio.
