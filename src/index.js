import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

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
    <App />,
  document.getElementById('root')
);
registerServiceWorker();
