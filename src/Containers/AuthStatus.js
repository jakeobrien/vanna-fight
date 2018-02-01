// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import { compose } from 'redux'

// const AuthStatus = ({ firebase, auth }) => {
// //   const isLoggedIn = auth.currentUser !== null;
// //   const name = isLoggedIn ? auth.currentUser.uid : "";
//   let action = null;
//   let label = null;
// //   if (isLoggedIn) {
// //       action = () => firebase.logout();
// //       label = "Sign Out";
// //   } else {
// //       action = () => auth.signInAnonymously();
// //       label = "Join";
// //   }
//   return (
//     <div>
//         {isLoaded(firebase.auth()) ? <span>Loading</span> : isEmpty(auth) ? <span>not authed</span> : <pre>{JSON.stringify(auth, null, 2)}</pre>}
//       <button onClick={action}>
//         {label}
//       </button>
//     </div>
//   )
// }

//   export default compose(
//     firebaseConnect(),
//     connect(({ firebase: { auth } }) => ({ auth }))
//   )(AuthStatus)
