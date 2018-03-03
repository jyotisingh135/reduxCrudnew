import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './index.css';
import * as action from './actions/useraction';

import AppStore from './reducers/index';
import App from './component/master';
import registerServiceWorker from './registerServiceWorker';
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const Store = createStore(AppStore, enhancer);
Store.dispatch(action.fetchUser());
Store.dispatch(action.fetchState());
Store.dispatch(action.pageAction(1,3));
ReactDOM.render(
    <Provider store={Store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
