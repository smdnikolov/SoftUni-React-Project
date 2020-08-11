import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { key, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from './key'
import axios from 'axios'

const firebaseConfig = {
    apiKey: key,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
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
