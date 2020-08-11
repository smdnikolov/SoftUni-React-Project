import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import key from './key'
import axios from 'axios'

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
    }
    async logOut() {
        return this.auth.signOut()
    }
    async postAd(data) {
        return await axios.post('https://the-olm.firebaseio.com/ads.json', data)
    }
    async getAds() {
        return await axios.get('https://the-olm.firebaseio.com/ads.json')
    }
    async getAd(id) {
        return await axios.get(`https://the-olm.firebaseio.com/ads/${id}.json`)
    }
    async del(id) {
        return await axios.delete(`https://the-olm.firebaseio.com/ads/${id}.json`)
    }
    async update(id, data) {
        return await axios.put(`https://the-olm.firebaseio.com/ads/${id}.json`, data)
    }
}
export default new Firebase()
