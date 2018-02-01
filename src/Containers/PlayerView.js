import React, {Component } from 'react';
import * as firebase from 'firebase';
import AppState from '../AppState'

class PlayerView extends Component {

    constructor() {
        super();
        this.joinGame = this.joinGame.bind(this);
    }

    componentDidMount() {
        this.setupDBRefs();
    }

    setupDBRefs() {
        this.rootRef = firebase.database().ref();
        this.rootRef.child("currentPlayers").on("value", snap => {
            this.setState({appState: snap.val()});
        });
    }

    joinGame() {
        let team = "team1Players";
        if (this.props.currentTeamPlacement === 2) team = "team2Players";
        firebase.database().ref().child(team).child(this.props.uid).set(true);
    }

    render() {
        let content = null;
        switch (this.props.appState) {
            case AppState.Joining:
                if (!this.props.isJoined) {
                    content = (
                        <form onSubmit={this.joinGame}>
                            <button type="submit" className="button">Join</button>
                        </form>
                    );
                } else {
                    content = ( <div><div>Team {this.props.team}</div><div>Waiting for game to start...</div></div> );
                }
                break;
            case AppState.StartingRound:
                content = ( <div><div>Team {this.props.team}</div><div>Waiting for game to start...</div></div> );
                break;
            case AppState.Playing:
                content = (
                    <div>
                    <div>Team {this.props.team}</div>
                    {/* <form onSubmit={this.props.playLetter}> */}
                        <button onClick={this.props.playLetter} type="submit" className="button" name={this.props.letter}>{this.props.letter}</button>
                    {/* </form> */}
                    </div>
                );
                break;
            case AppState.RoundResults:
                content = ( <div><div>Team {this.props.team}</div><div>{this.props.teamWon ? "YOU WON THE ROUND" : "YOU LOST THE ROUND"}</div></div> );
                break;
            case AppState.GameResults:
                content = ( <div><div>Team {this.props.team}</div><div>{this.props.teamWon ? "YOU WON THE GAME" : "YOU LOST THE GAME"}</div></div> );
                break;
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default PlayerView;
