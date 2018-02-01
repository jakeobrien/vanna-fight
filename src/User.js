import Auth from './Auth.js';
import * as firebase from 'firebase';

const DefaultUser = {
    name: "",
    isHost: false,
    letters: ""
};

class User {

    constructor() {
        this.auth = new Auth();
        this.auth.stateChanged = this.authStateChanged.bind(this);
        this.isLoggedIn = this.auth.isLoggedIn;
        this.name = "";
        this.isHost = false;
        this.rootRef = firebase.database().ref();
        this.usersRef = this.rootRef.child("users");
        this.userRef = null;
        this.uid = null;
    }

    signIn() {
        this.auth.signIn();
    }

    signOut() {
        this.auth.signOut();
    }

    setIsLoggedIn(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedInChanged) this.isLoggedInChanged();
    }

    setName(name) {
        this.name = name;
        if (this.nameChanged) this.nameChanged();
    }

    setIsHost(isHost) {
        this.isHost = isHost;
        if (this.isHostChanged) this.isHostChanged();
    }

    setLetters(letters) {
        this.letters = letters;
        if (this.lettersChanged) this.lettersChanged();
    }

    pushLetters(letters) {
        this.userRef.child("letters").set(letters);
    }

    pushName(name) {
        this.userRef.child("name").set(name);
    }

    pushIsHost(isHost) {
        this.userRef.child("isHost").set(isHost);
    }

    authStateChanged() {
        this.setIsLoggedIn(this.auth.isLoggedIn);
        if (this.isLoggedIn) {
            this.setupUser();
        } else {
            this.clearUser();
        }
    }

    setupUser() {
        this.usersRef.once("value", snap => {
            if (!snap.hasChild(this.auth.uid)) {
                this.usersRef.child(this.auth.uid).set(DefaultUser);
            }
            this.uid = this.auth.uid;
            this.userRef = this.usersRef.child(this.auth.uid);
            this.userRef.child("name").on("value", snap => {
                this.setName(snap.val());
            });
            this.userRef.child("isHost").on("value", snap => {
                this.setIsHost(snap.val());
            });
            this.userRef.child("letters").on("value", snap => {
                this.setLetters(snap.val());
            });
        });
    }

    clearUser() {
        this.userRef = null;
        this.setName("");
    }
}

export default User;
