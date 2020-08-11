import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import axios from 'axios'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_UR,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
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
