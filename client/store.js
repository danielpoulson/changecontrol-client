// @flow

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducers';
// import { setUserFromSessionState } from './actions/actions_main';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, promise),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

// store.dispatch(setUserFromSessionState);

export default store;
