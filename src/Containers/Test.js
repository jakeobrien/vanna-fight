// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

// const Test = ({ users, firebase }) => {
//   const pushSample = () => firebase.set('app-state', 1)
//   const as = !isLoaded(users)
//   ? 'Loading'
//   : isEmpty(users)
//     ? 'no players'
//     : Object.keys(users).map(
//         (key, id) => (
//           key
//         )
//       )
//   return (
//     <div>
//       <h1>Todos</h1>
//       <ul>
//         {as}
//       </ul>
//       <button onClick={pushSample}>
//         Add
//       </button>
//     </div>
//   )
// }

// export default compose(
//     firebaseConnect([
//       'users' // { path: '/todos' } // object notation
//     ]),
//     connect(
//       (state) => ({
//         users: state.firebase.data.users,
//         // profile: state.firebase.profile // load profile
//       })
//     )
//   )(Test)
