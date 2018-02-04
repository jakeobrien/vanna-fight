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
        if (!this.props.isJoined && this.props.appState !== AppState.Joining) {
            return ( <div>game in progress. please wait</div> );
        }
        switch (this.props.appState) {
            case AppState.Joining:
                if (!this.props.isJoined) {
                    content = (
                        <form onSubmit={this.joinGame}>
                            <button type="submit" className="button">JOIN GAME</button>
                        </form>
                    );
                } else {
                    content = ( <div><div>TEAM {this.props.team}</div><div>waiting for game to start...</div></div> );
                }
                break;
            case AppState.StartingRound:
                content = ( <div><div>TEAM {this.props.team}</div><div>waiting for game to start...</div></div> );
                break;
            case AppState.Playing:
                content = (
                    <div>
                    <div>TEAM {this.props.team}</div>
                    {/* <form onSubmit={this.props.playLetter}> */}
                        <button className={this.props.willDelete ? "del-letter" : this.props.hasPlayed ? "has-played-letter" : "letter"} onClick={this.props.playLetter} type="submit" name={this.props.letter}>{this.props.letter}</button>
                    {/* </form> */}
                    </div>
                );
                break;
            case AppState.RoundResults:
                content = ( <div><div className="team">Team {this.props.team}</div><div className="win-announce">{this.props.teamWon ? "YOU WON THE ROUND" : "YOU LOST THE ROUND"}</div></div> );
                break;
            case AppState.GameResults:
                content = ( <div><div className="team">Team {this.props.team}</div><div className="win-announce">{this.props.teamWon ? "YOU WON THE GAME" : "YOU LOST THE GAME"}</div></div> );
                break;
        }
        return (
            <div className={this.props.team === 1 ? "team1" : this.props.team === 2 ? "team2" : ""}>
                {content}
            </div>
        );
    }
}

export default PlayerView;
