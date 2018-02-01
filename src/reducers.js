// import {
//     CHANGE_APP_STATE,
//     SIGN_IN,
//     SIGN_OUT,
//     SET_NAME,
//     START_HOST,
//     STOP_HOST
// } from './actions.js';

// const initialState = {
//     appState: 0,
//     isLoggedIn: false,
//     userName: '',
//     isHost: false,
//     hostIsClaimed: false
// };

// const reducers =  (state = initialState, action = {}) =>
// {
// 	switch (action.type)
// 	{
// 		case CHANGE_APP_STATE:
//             return {...state, appState:action.appState};
//         case SIGN_IN:
//             return {...state, isLoggedIn: true};
//         case SIGN_OUT:
//             return {...state, isLoggedIn: false};
//         case SET_NAME:
//             return {...state, userName: action.name};
//         case START_HOST:
//             return {...state, isHost: true, hostIsClaimed: true};
//         case STOP_HOST:
//             return {...state, isHost: false, hostIsClaimed: false};
// 		default:
// 			return state;
// 	}
// };

// export default reducers;
