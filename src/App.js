import React, {Component } from 'react';
import './App.css' ;
import AuthToggle from './Components/AuthToggle.js'
import HostStatus from './Components/HostStatus.js'
import * as firebase from 'firebase';
import User from './User.js'
import PlayerView from './Containers/PlayerView.js'
import HostView from './Containers/HostView.js'
import AppState from './AppState'
import phrases from './phrases'

class App extends Component {

    constructor() {
        super();
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.toggleHost = this.toggleHost.bind(this);
        this.getIsHost = this.getIsHost.bind(this);
        this.setHasHost = this.setHasHost.bind(this);
        this.startGame = this.startGame.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.deleteAllUsers = this.deleteAllUsers.bind(this);
        this.endGame = this.endGame.bind(this);
        this.playLetter = this.playLetter.bind(this);
        this.playedWordIndices = [];
        this.state = {
            appState: 0,
            hasHost: false,
            currentTeamPlacement: 1,
            currentWord: "",
            currentWordLength: 0,
            lastWinner: 1,
            team1Score: 0,
            team2Score: 1,
            team1Word: "",
            team2Word: "",
            team1Players: {
            },
            team2Players: {
            },
            user: {
                name: "",
                isHost: false,
                isLoggedIn: false,
                letters: "",
                hasPlayed: false
            }
        };
    }

    componentDidMount() {
        this.setupUser();
        this.setupDBRefs();
    }

    setupDBRefs() {
        this.rootRef = firebase.database().ref();
        this.rootRef.child("app-state").on("value", snap => {
            this.setState({appState: snap.val()});
        });
        this.rootRef.child("hasHost").on("value", snap => {
            this.setState({hasHost: snap.val()});
        });
        this.rootRef.child("lastWinner").on("value", snap => {
            this.setState({lastWinner: snap.val()});
        });
        this.rootRef.child("team1Word").on("value", snap => {
            this.setState({team1Word: snap.val()}, ()=>{ this.checkForRoundWon()});
        });
        this.rootRef.child("team2Word").on("value", snap => {
            this.setState({team2Word: snap.val()}, ()=>{ this.checkForRoundWon()});
        });
        this.rootRef.child("team1Score").on("value", snap => {
            this.setState({team1Score: snap.val()});
        });
        this.rootRef.child("currentWordLength").on("value", snap => {
            this.setState({currentWordLength: snap.val()});
        });
        this.rootRef.child("team2Score").on("value", snap => {
            this.setState({team2Score: snap.val()});
        });
        this.rootRef.child("team1Players").on("value", snap => {
            this.setState({team1Players: snap.val()});
        });
        this.rootRef.child("team2Players").on("value", snap => {
            this.setState({team2Players: snap.val()});
        });
        this.rootRef.child("team1Players").on("child_added", data => {
            var newPlayer = {};
            newPlayer[data.key] = true;
            let newCurrent = this.state.team1Players;
            Object.assign(newCurrent, newPlayer);
            this.setState( (prevState, props) => ({
              team1Players: newCurrent,
              currentTeamPlacement: 2
            })
        )});
        this.rootRef.child("team2Players").on("child_added", data => {
            var newPlayer = {};
            newPlayer[data.key] = true;
            let newCurrent = this.state.team2Players;
            Object.assign(newCurrent, newPlayer);
            this.setState( (prevState, props) => ({
              team2Players: newCurrent,
              currentTeamPlacement: 1
            })
        )});
    }

    setupUser() {
        this.user = new User();
        this.user.isLoggedInChanged = () => this.setState((prevState, props) => ({
            user: {...prevState.user, isLoggedIn: this.user.isLoggedIn}
        }));
        this.user.nameChanged = () => this.setState((prevState, props) => ({
            user: {...prevState.user, name: this.user.name}
        }));
        this.user.hasPlayedChanged = () => this.setState((prevState, props) => ({
            user: {...prevState.user, hasPlayed: this.user.hasPlayed}
        }));
        this.user.isHostChanged = () => {
            if (this.user.isHost) this.sortPhrases();
            this.setState((prevState, props) => ({ user: {...prevState.user, isHost: this.user.isHost} }));
        };
        this.user.lettersChanged = () => this.setState((prevState, props) => ({
            user: {...prevState.user, letters: this.user.letters}
        }));
    }

    toggleSignIn(event) {
      if (this.user.isLoggedIn) this.user.signOut();
      else this.user.signIn();
      event.preventDefault();
    }

    setHasHost(hasHost) {
      firebase.database().ref().child("hasHost").set(hasHost);
    }

    toggleHost(event) {
      let newVal = !this.user.isHost;
      console.log(newVal);
      this.user.pushIsHost(newVal);
      this.setHasHost(newVal);
      event.preventDefault();
    }

    getIsHost() {
      if (!this.state.user.isLoggedIn) return false;
      return this.state.user.isHost;
    }

    startGame() {
      const numberPlayersPerTeam = Object.keys(this.state.team1Players).length;
      let word = this.getWord(numberPlayersPerTeam);
      firebase.database().ref().child("app-state").set(AppState.Playing);
      this.setState({currentWord: word});
      firebase.database().ref().child("currentWordLength").set(word.length);
      firebase.database().ref().child("lastWinner").set(0);
      firebase.database().ref().child("team1Word").set("");
      firebase.database().ref().child("team2Word").set("");

      let noSpaces = word.replace(/ /g, "");
      let team1Scrambled = this.shuffle(noSpaces);
      let team2Scrambled = this.shuffle(noSpaces);
      for (var i = 0; i <numberPlayersPerTeam; i++) {
        var letter1 = team1Scrambled[i];
        var letter2 = team2Scrambled[i];
        var user1 = Object.keys(this.state.team1Players)[i];
        var user2 = Object.keys(this.state.team2Players)[i];
        firebase.database().ref().child("users").child(user1).child("letters").set(letter1);
        firebase.database().ref().child("users").child(user1).child("hasPlayed").set(false);
        firebase.database().ref().child("users").child(user2).child("letters").set(letter2);
        firebase.database().ref().child("users").child(user2).child("hasPlayed").set(false);
      }
    }

    sortPhrases() {
      this.sortedPhrases = {};
      phrases.forEach(sortPhrases => {
        let count = sortPhrases.replace(/ /g, "").length.toString();
        if (this.sortedPhrases[count] === undefined) this.sortedPhrases[count] = [];
        this.sortedPhrases[count].push(sortPhrases);
      });
      console.log(this.sortedPhrases);
    }

    getWord(count) {
      // remove spaces
      let words = this.sortedPhrases[count.toString()];
      let availableIndices = [];
      for (var i = 0; i < words.length; i++) {
        if (!this.playedWordIndices.includes(i)) availableIndices.push(i);
      }
      let index = availableIndices[Math.floor(Math.random()*availableIndices.length)];
      let word = words[index];
      this.playedWordIndices.push(index);
      return word.toUpperCase();
    }

    cancelGame() {
      firebase.database().ref().child("app-state").set(AppState.Joining);
      firebase.database().ref().child("lastWinner").set(0);
      firebase.database().ref().child("team1Score").set(0);
      firebase.database().ref().child("team2Score").set(0);
      firebase.database().ref().child("team1Word").set("");
      firebase.database().ref().child("team2Word").set("");
      firebase.database().ref().child("team1Players").set(0);
      firebase.database().ref().child("team2Players").set(0);
    }

  deleteAllUsers() {
    this.cancelGame();
    firebase.database().ref().child("hasHost").set(false);
    firebase.database().ref().child("users").set(0);
  }

    restartGame() {
      firebase.database().ref().child("app-state").set(AppState.StartingRound);
      firebase.database().ref().child("lastWinner").set(0);
      firebase.database().ref().child("team1Score").set(0);
      firebase.database().ref().child("team2Score").set(0);
      firebase.database().ref().child("team1Word").set("");
      firebase.database().ref().child("team2Word").set("");
    }

    endGame() {
       let winningTeam = 2;
       if (this.state.team1Score > this.state.team2Score) winningTeam = 1;
       firebase.database().ref().child("lastWinner").set(winningTeam);
      firebase.database().ref().child("app-state").set(AppState.GameResults);

    }

    shuffle (word) {
      var i = 0
        , j = 0
        , temp = null
      var newWord = word.slice(0);
      for (i = word.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = newWord[i]
        newWord = this.replaceAt(newWord, i, newWord[j]);
        newWord = this.replaceAt(newWord, j, temp);
        // newWord[i] = newWord[j]
        // newWord[j] = temp
      }
      return newWord;
    }

    replaceAt(word, index, replacement) {
      return word.substr(0, index) + replacement + word.substr(index + replacement.length)
    }

    playLetter(event) {
      event.preventDefault();
      let letter = event.target.name;
      // if (this.state.user.isLoggedIn || this.state.user.isHost) return;
      let isOnTeam1 = this.state.team1Players[this.user.uid] !== undefined;
      let isOnTeam2 = this.state.team2Players[this.user.uid] !== undefined;
      var newWord;
      var added = true;
      if (isOnTeam1) {
        if (this.state.user.hasPlayed && this.isLastLetter(this.state.team1Word, letter)) {
          newWord = this.deleteLastLetter(this.state.team1Word);
          added = false;
        } else {
          if (this.state.team1Word.length >= this.state.currentWordLength) return;
          newWord = this.state.team1Word + letter;
        }
        firebase.database().ref().child("team1Word").set(newWord);
      }
      if (isOnTeam2) {
        if (this.state.user.hasPlayed && this.isLastLetter(this.state.team2Word, letter)) {
          newWord = this.deleteLastLetter(this.state.team2Word);
          added = false;
        } else {
          if (this.state.team2Word.length >= this.state.currentWordLength) return;
          newWord = this.state.team2Word + letter;
        }
        firebase.database().ref().child("team2Word").set(newWord);
      }
      this.user.pushHasPlayed(added);
    }

    deleteLastLetter(word) {
      return word.substr(0, word.length - 1);
    }

    isLastLetter(word, letter) {
      if (word === undefined || word.length === 0) return false;
      return (word[word.length-1] === letter);
    }

    checkForRoundWon() {
      if (!this.state.user.isHost) return;
      let noSpaces = this.state.currentWord.replace(/ /g, "");
      if (this.state.team1Word !== "" && this.state.team1Word === noSpaces) {
        let newScore = this.state.team1Score + 1;
        firebase.database().ref().child("lastWinner").set(1);
        firebase.database().ref().child("team1Score").set(newScore);
        firebase.database().ref().child("app-state").set(AppState.RoundResults);
      }
      if (this.state.team2Word !== "" && this.state.team2Word === noSpaces) {
        let newScore = this.state.team2Score + 1;
        firebase.database().ref().child("lastWinner").set(2);
        firebase.database().ref().child("team2Score").set(newScore);
        firebase.database().ref().child("app-state").set(AppState.RoundResults);
      }
    }

    render() {
        let hostStatus = null;
        let main = null;
        const numberPlayers = Object.keys(this.state.team1Players).length + Object.keys(this.state.team2Players).length;
        if (this.state.user.isLoggedIn) {
          let isOnTeam1 = this.state.team1Players[this.user.uid] !== undefined;
          let isOnTeam2 = this.state.team2Players[this.user.uid] !== undefined;
          let teamWord = isOnTeam1 ? this.state.team1Word : this.state.team2Word;
          let willDelete = this.user.hasPlayed && this.isLastLetter(teamWord, this.state.user.letters);
          let team = 0;
          if (isOnTeam1) team = 1;
          if (isOnTeam2) team = 2;
          let isJoined = isOnTeam1 || isOnTeam2;
          if (!isJoined) hostStatus = ( <HostStatus hasHost={this.state.hasHost} isHost={this.getIsHost()} onSubmit={this.toggleHost} /> );
          if (this.user.isHost) {
            let numberPerTeam = Math.floor(numberPlayers / 2);
            let numberWords = 0;
            let p = this.sortedPhrases[numberPerTeam.toString()];
            if (p !== undefined) numberWords = p.length;
            main = (
              <HostView numberPlayers={numberPlayers}
                        appState={this.state.appState}
                        teamWon={this.state.lastWinner}
                        team1Score={this.state.team1Score}
                        team2Score={this.state.team2Score}
                        team1Word={this.state.team1Word}
                        team2Word={this.state.team2Word}
                        currentWord={this.state.currentWord}
                        numberWords={numberWords}
                        cancelGame={this.cancelGame}
                        restartGame={this.restartGame}
                        deleteAllUsers={this.deleteAllUsers}
                        endGame={this.endGame}
                        startGame={this.startGame} /> );
          } else {
            let teamWon = (this.state.lastWinner === 1 && isOnTeam1) || (this.state.lastWinner === 2 && isOnTeam2);
             main = (
              <PlayerView  uid={this.user.uid}
                           isJoined={isJoined}
                           appState={this.state.appState}
                           teamWon={teamWon}
                           team={team}
                           letter={this.state.user.letters}//{this.state.user.letters[this.state.user.letters.length-1]}
                           playLetter={this.playLetter}
                           hasPlayed={this.user.hasPlayed}
                           willDelete={willDelete}
                           currentTeamPlacement={this.state.currentTeamPlacement} /> );
          }
        }
        return (
            <div className="App">
              {main}
              {hostStatus}
              <AuthToggle isLoggedIn={this.state.user.isLoggedIn} onSubmit={this.toggleSignIn} />
            </div>
        );
    }
}

export default App;
