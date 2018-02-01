import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
// import reducers from './reducers.js';
// import StatusBar from './Containers/StatusBar.js'
import AuthStatus from './Containers/AuthStatus.js'



var config = {
  apiKey: "AIzaSyArKRc9g1Kil5fKU4tfROx5x7kLnE6OB-Y",
  authDomain: "vanna-fight.firebaseapp.com",
  databaseURL: "https://vanna-fight.firebaseio.com/",
  projectId: "vanna-fight",
  storageBucket: "https://vanna-fight.firebaseio.com/",
  messagingSenderId: "1075559996035"
};
firebase.initializeApp(config);

const rrfConfig = {
  userProfile: 'users',
  presence: 'presence',
  enableLogging: true
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

const initialState = {
  // appState: 0,
  // isLoggedIn: false,
  // userName: '',
  // isHost: false,
  // hostIsClaimed: false
};

const store = createStoreWithFirebase(rootReducer, initialState);


const App = () => (
  <Provider store={store}>
      <AuthStatus />
  </Provider>
);

render(<App/>, document.getElementById('root'));
registerServiceWorker();
