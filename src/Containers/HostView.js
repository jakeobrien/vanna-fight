import React, {Component } from 'react';
import * as firebase from 'firebase';
import AppState from '../AppState'

class HostView extends Component {

    constructor() {
        super();
    }

    render() {
        let content = null;
        let startGame = (
            <form onSubmit={this.props.startGame}>
                <button type="submit" className="button">Start Round</button>
            </form>
        );
        let cancelGame = (
            <form onSubmit={this.props.cancelGame}>
                <button type="submit" className="button">Cancel Game</button>
            </form>
        );
        let endGame = (
            <form onSubmit={this.props.endGame}>
                <button type="submit" className="button">End Game</button>
            </form>
        );
        switch (this.props.appState) {
            case AppState.Joining:
                let showStartGame = false;
                if (this.props.numberPlayers >= 2 && this.props.numberPlayers % 2 === 0) {
                    showStartGame = true;
                }
                content = (
                    <div>
                        <div>Number Players: {this.props.numberPlayers}</div>
                        {showStartGame ? startGame : null}
                    </div>
                );
                break;
            case AppState.Playing:
                content = (
                    <div>
                        <div>TEAM 1: {this.props.team1Word}</div>
                        <div>TEAM 2: {this.props.team2Word}</div>
                    </div>
                );
                break;
            case AppState.RoundResults:
                content = (
                    <div>
                    <div>TEAM {this.props.teamWon} WON THE ROUND!</div>
                    <div>Score:</div>
                    <div>Team 1:{this.props.team1Score}</div>
                    <div>Team 2:{this.props.team2Score}</div>
                    <div>{startGame}</div>
                    <div>{endGame}</div>
                    </div>
                );
                break;
            case AppState.GameResults:
                content = (
                    <div>
                    <div>TEAM {this.props.teamWon} WON THE GAME!</div>
                    <div>Score:</div>
                    <div>Team 1:{this.props.team1Score}</div>
                    <div>Team 2:{this.props.team2Score}</div>
                    </div>

                );
                break;
            }
        return (
            <div>
                {content}
                {cancelGame}
            </div>
        );
    }
}

export default HostView;
