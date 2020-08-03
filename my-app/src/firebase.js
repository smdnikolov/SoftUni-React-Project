import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import key from'./key'


const firebaseConfig = {
    apiKey: key,
    authDomain: "the-olm.firebaseapp.com",
    databaseURL: "https://the-olm.firebaseio.com",
    projectId: "the-olm",
    storageBucket: "the-olm.appspot.com",
    messagingSenderId: "533289266506",
    appId: "1:533289266506:web:1833febb1272c471fe25b3"
};



class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth()
        this.db = app.database()
    }

    signUp(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }
    logOut() {
        return this.auth.signOut()
    }

    register(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }
}
export default new Firebase()
