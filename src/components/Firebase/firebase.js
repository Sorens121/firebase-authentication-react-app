import firebaseApp from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messageingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

class Firebase {
    constructor() {
        firebaseApp.initializeApp(config)

        this.auth = firebaseApp.auth()
    }

    /******** Auth API ***********/

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password)
    }

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password)
    }

    doSignOut = () => this.auth.signOut()

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)
}

export default Firebase