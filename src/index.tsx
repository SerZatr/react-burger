import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BASE_WS, IIngredient, orderFeed } from './utils/constants';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { onClose, onError, onMessage, onOpen, wsClose, wsInit } from './services/actions/order-feed';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions = {
  wsInit: wsInit,
  onOpen: onOpen,
  onClose: onClose,
  onError: onError,
  onMessage: onMessage,
  wsClose: wsClose
};

export type TWsActions = typeof wsActions;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions, BASE_WS)));

const initialState = {
  ingredients: {
    data: [] as IIngredient[],
    request: false,
    failed: false
  },
  cart: {
    ingredients: []
  },
  order: {
    order: undefined as undefined | number,
    orderRequest: false,
    orderFailed: false
  },
  ingredientDetails: {
    ingredient: undefined
  },
  orderFeed: {
    data: {} as orderFeed
  }
}

const store = createStore(
  rootReducer,
  initialState as any,
  enhancer
); 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();