import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import reducers from './reducers.js';


let store = createStore(reducers);

var config = {
    apiKey: "AIzaSyArKRc9g1Kil5fKU4tfROx5x7kLnE6OB-Y",
    authDomain: "vanna-fight.firebaseapp.com",
    databaseURL: "https://vanna-fight.firebaseio.com/",
    projectId: "vanna-fight",
    storageBucket: "https://vanna-fight.firebaseio.com/",
    messagingSenderId: "1075559996035"
  };
firebase.initializeApp(config);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
