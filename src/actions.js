export const CHANGE_APP_STATE = 'CHANGE_APP_STATE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_NAME = 'SET_NAME';
export const START_HOST = 'START_HOST';
export const STOP_HOST = 'STOP_HOST';

export const AppState = {
    Dormant: 0,
    Joining: 1,
    Ready: 2,
    Playing: 3,
    RoundResult: 4,
    GameResult: 5
}

export function changeAppState(appState) {
    return { type: CHANGE_APP_STATE, appState };
}

export function signIn() {
    return { type: SIGN_IN };
}

export function signOut() {
    return { type: SIGN_OUT  };
}

export function setName(name) {
    return { type: SET_NAME, name };
}

export function startHost() {
    return { type: START_HOST };
}

export function stopHost() {
    return { type: STOP_HOST };
}
