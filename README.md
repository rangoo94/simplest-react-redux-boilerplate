# Simplest React & Redux Boilerplate

## What does it include?

- Router
- Build procedures, both for development and production (with Webpack)
- Application structure with separated application logic & UI
- Working fully server-side, both with routing and asynchronous actions

## How you should maintain it?

### Server

If you need to set up server, e.g. to expose API, update `src/server/index.js` file.

### Store

If you want to use some additional middlewares or adjust store in any way, probably you will want to update `src/base/create-store.js`

### Dispatching application

If you want to adjust dispatching application, probably you will want to adjust `dispatch` method in `src/base/Application.js`

### Application logic

If you want to prepare some business logic (e.g. `get articles` or `load locales`) you should take a look at `src/logic` directory.
It's worth to keep there module per directory (e.g. `articles`).
Each module should have reducers and optionally effects. Reducers are updating application state (in Redux store).
Effects are side effects which are fired after after some action on application side.

### User Interface

Just set up everything in `src/ui` directory. For loading data, take a look at `Asynchronous actions` section below.

## What you should think about?

### Asynchronous actions

Asynchronous actions are using `react-redux-async-render` library.
It's worth to be always careful when you are adding asynchronous actions.
If you want to load some data for component, probably it's best to dispatch async action from `componentWillMount` action.
If you don't want to repeat this request again on client-side you should make there condition - only if it's not loaded already.

### Webpack configuration

Remember to always check both node & client webpack configuration after update!

## Why this boilerplate has been created?

I am wasted seeing such complex React/Redux boilerplates as usual.
They have problems both with complexity and code quality.
Additionally, they have a lot of problems with decoupling, e.g. mixing business logic with UI.

## To do list

- [ ] Set up basic UI
- [ ] Set up builds to work fully correct
- [ ] Implement React Hot Loader
- [ ] Implement building full HTML structure
- [ ] Prepare example application based on it
- [ ] Set up all basic assets handling
- [ ] Hide errors on production
- [ ] Prepare unit tests
- [ ] Handle promises as asynchronous actions
- [ ] Prepare branches with some advanced boilerplates, e.g. with translations or `redux-saga`
- [ ] Set up basic API client
