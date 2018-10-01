import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './utils/reducers/Reducers';
import { Provider } from 'react-redux';
import { AUTH_SUCCESS } from './utils/constants/ActionsConst';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token')
if (token) store.dispatch({ type: AUTH_SUCCESS })

ReactDOM.render(<Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
