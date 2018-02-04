import React, {Component } from 'react';
import * as firebase from 'firebase';
import AppState from '../AppState'

class HostView extends Component {

    constructor() {
        super();
        this.getWordMask = this.getWordMask.bind(this);
    }

    getWordMask(targetWord, currentWord) {
        let mask = "";
        let c = 0;
        for (var i = 0; i < targetWord.length; i++) {
            if (targetWord[i] == " ") mask += "  ";
            else {
                if (c < currentWord.length) mask += currentWord[c];
                else mask += "_";
                c++;
            }
            mask += " ";
        }
        return mask;
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
        let restartGame = (
            <form onSubmit={this.props.restartGame}>
                <button type="submit" className="button">Restart Game</button>
            </form>
        );
        let deleteAllUsers = (
            <form onSubmit={this.props.deleteAllUsers}>
                <button type="submit" className="button">Delete Users</button>
            </form>
        );
        switch (this.props.appState) {
            case AppState.Joining:
                let showStartGame = false;
                restartGame = null;
                if (this.props.numberPlayers >= 2 && this.props.numberPlayers % 2 === 0) {
                    showStartGame = true;
                }
                content = (
                    <div>
                        <div className="address">Go to bit.ly/vanna-fight</div>
                        <div>Number Players: {this.props.numberPlayers}</div>
                        <div>Number Words: {this.props.numberWords}</div>
                        {showStartGame ? startGame : null}
                    </div>
                );
                break;
            case AppState.Playing:
                content = (
                    <div>
                        <div className="puzzle">TEAM 1 <span className="word">{this.getWordMask(this.props.currentWord, this.props.team1Word)}</span></div>
                        <div className="puzzle">TEAM 2 <span className="word">{this.getWordMask(this.props.currentWord, this.props.team2Word)}</span></div>
                    </div>
                );
                break;
            case AppState.RoundResults:
                content = (
                    <div>
                    <div className="win-announce">TEAM {this.props.teamWon} WON THE ROUND!</div>
                    <div className="word-announce">The word was: {this.props.currentWord}</div>
                    <div className="score">TEAM 1 <span className="score-number">{this.props.team1Score}</span></div>
                    <div className="score">TEAM 2 <span className="score-number">{this.props.team2Score}</span></div>
                    <div>{startGame}</div>
                    <div>{endGame}</div>
                    </div>
                );
                break;
            case AppState.StartingRound:
                content = (
                    <div>
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
                {restartGame}
                {cancelGame}
                {deleteAllUsers}
            </div>
        );
    }
}

export default HostView;
