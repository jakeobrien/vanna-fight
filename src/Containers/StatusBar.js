import React from 'react'
import { connect } from 'react-redux'
import Button from '../Components/Button.js'
import { signIn, signOut, startHost, stopHost } from '../actions.js'

let StatusBar = ({ userName, isLoggedIn, hostIsClaimed, isHost, onSignIn, onSignOut, onStartHost, onStopHost }) => {
    let signIn = null;
    let host = null;
    if (isLoggedIn) {
        signIn = <Button text="Sign Out" onClick={onSignOut} />
        if (hostIsClaimed) {
            if (isHost) {
                host = <Button text="Stop Hosting" onClick={onStopHost} />
            }
        } else {
            host = <Button text="Host" onClick={onStartHost} />
        }
    } else {
        signIn = <Button text="Sign In" onClick={onSignIn} />
    }
    return (
        <div>
            <span>{userName}</span>
            <span>{host}</span>
            <span>{signIn}</span>
        </div>
    )
}

function mapState(state) {
    return {
        userName: state.userName,
        isLoggedIn: state.isLoggedIn,
        hostIsClaimed: state.hostIsClaimed,
        isHost: state.isHost
    }
}

function mapDispatch(dispatch) {
    return {
        onSignIn: () => dispatch(signIn()),
        onSignOut: () => dispatch(signOut()),
        onStartHost: () => dispatch(startHost()),
        onStopHost: () => dispatch(stopHost())
    }
}

StatusBar =  connect(mapState, mapDispatch)(StatusBar);

export default StatusBar
