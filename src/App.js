import React from 'react';
import './App.css' ;
import StatusBar from './Containers/StatusBar.js'


const App = () => (
  <div>
      <StatusBar />
  </div>
);

// class App extends Component {

//     constructor() {
//         super();
//         this.toggleSignIn = this.toggleSignIn.bind(this);
//         this.state = {
//             appState: 0,
//             user: {
//                 name: ""
//             }
//         };
//     }

//     componentDidMount() {
//         this.setupUser();
//         this.setupDBRefs();
//     }

//     setupDBRefs() {
//         this.rootRef = firebase.database().ref();
//         this.rootRef.child("appState").on("value", snap => {
//             this.setState({appState: snap.val()});
//         });
//     }

//     setupUser() {
//         this.user = new User();
//         this.user.isLoggedInChanged = () => this.setState((prevState, props) => ({
//             user: {...prevState.user, isLoggedIn: this.user.isLoggedIn}
//         }));
//         this.user.nameChanged = () => this.setState((prevState, props) => ({
//             user: {...prevState.user, name: this.user.name}
//         }));
//     }

//     toggleSignIn(event) {
//         if (this.user.isLoggedIn) this.user.signOut();
//         else this.user.signIn();
//         event.preventDefault();
//     }


//     render() {

//         return (
//             <div className="App">
//               <StatusBar
//               <MainView user={this.state.user} appState={this.state.appState} />
//               <AuthToggle isLoggedIn={this.state.user.isLoggedIn} onSubmit={this.toggleSignIn} />
//             </div>
//         );
//     }
// }

export default App;
