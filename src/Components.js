import React, { Component } from 'react';
import AppState from './AppState.js';
import User from './User.js';

export class MainView extends Component {

    render() {
        if (!this.props.user.isLoggedIn) return null;
        var contentView = null;
        if (!this.props.user.name) {
            contentView = ( <SetNameForm user={this.props.user} /> );
        } else if (this.props.user.isHost) {
            contentView = ( <HostView user={this.props.user} /> );
        } else {
            contentView = ( <PlayerView user={this.props.user} /> );
        }

        return (
            <div>
                <UserStatus user={this.props.user} />
                {contentView}
                <ClaimHost appState={this.props.appState} user={this.props.user} />
            </div>
        );
    }
}
export class UserStatus extends Component {
    render() {
        if (!this.props.user || !this.props.user.isLoggedIn  || !this.props.user.name) return null;
        return (
            <div className="header">
                <span>{this.props.user.name}</span>
            </div>
        );
    }
}

export class AuthToggle extends Component {
    render() {
        // if (this.props.isLoggedIn) return null;
        var buttonText = this.props.isLoggedIn ? "Sign Out" : "Join";
        return (
            <div>
                <form onSubmit={this.props.onSubmit}>
                    <button type="submit" className="button" value={buttonText}>{buttonText}</button>
                </form>
            </div>
        );
    }
}

export class SetNameForm extends Component {

    constructor() {
        super();
        this.setName = this.setName.bind(this);
        this.state = {
            tentativeName: ""
        };
    }

    nameChanged = (event) => {
        this.setState({
            tentativeName: event.target.value
        });
    }

    setName(event) {
        event.preventDefault();
        console.log(this == null);
        console.log(this.props.user == null);
        console.log(this.state.tentativeName);
        this.props.user.pushName(this.state.tentativeName);
    }

    render() {
        return (
            <form onSubmit={this.setName}>
                <input type="text" className="textInput" onChange={this.nameChanged} value={this.state.tentativeName} placeholder="Enter name..." />
                <button type="submit" className="button" value="Go">Go</button>
            </form>
        );
    }
}
RubriksPube3
export class ClaimHost extends Component {
    render() {
        if (this.props.appState != AppState.Dormant) return null;
        return (
            <div>
                <form onSubmit={this.props.onSubmit}>
                    <button type="submit" className="button">Host</button>
                </form>
            </div>
        );
    }
}

export class HostView extends Component {

    render() {
        return (
            <div>host</div>
        );
    }
}

export class PlayerView extends Component {

    render() {
        return (
            <div>player</div>
        );
    }
}

