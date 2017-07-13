import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';

const store = configureStore({
  users: {
    user: {
      name: 'foouser'
    },
    allUsers: [
      {
        name: 'otheruser1'
      },
      {
        name: 'otheruser'
      },
    ]
  },
  wishes: [
    {
      text: 'wish1'
    },
    {
      text: 'wish2'
    }
  ]
});

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
