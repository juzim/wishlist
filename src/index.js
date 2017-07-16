import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
registerServiceWorker();

let header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
});
let sentData={
    method:'GET',
    mode: 'cors',
    header: header
};

fetch('http://localhost:3001/api/lists', sentData)
  .then(function(response) {
    return response.json()
  }).then(function(json) {

    const data = {
      users: {
        user: json.user,
        allUsers: json.allUsers || []
      },
      wishes: json.wishes || []
    }
    const store = configureStore(data);

    render(
      <Provider store={store}>
        <App />
      </Provider>
      , document.getElementById('root')
    );
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
