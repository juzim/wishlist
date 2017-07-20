import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import {fetchData} from './tools/api'
registerServiceWorker();

let onSuccess = (data) => {
  const result = {
    users: {
      user: data.user,
      allUsers: data.allUsers || []
    },
    wishes: {
      isCreating: false,
      wishes: data.wishes.sort(function(w1,w2) {
        console.log(w1.text, w2.text)
        return w1.text > w2.text
      }) || [],
      isLoading: {},
      isEditing: {}
    }
  }
  const store = configureStore(result);

  render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root')
  );
}

fetchData("lists", onSuccess)
