import React, { useContext, useState, useEffect } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { UserContext, ToastContext } from '../../Store'
import { useHistory, } from 'react-router-dom'
import SuccessAlert from '../../components/success-alert'

function Profile() {

    const history = useHistory()
    const [ads, setAds] = useState(null)
    const [myAds, setMyAds] = useState(null)
    const [myFollowedAds, setFollowedAds] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [toast, setToast] = useContext(ToastContext)
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    async function logout() {
        try {
            firebase.logOut()
            setToast('loggedOut')
            localStorage.removeItem('logged')
            history.push('/login')
        } catch (error) {
            console.log(error)
            history.push('/network-error')
        }
    }
    function toggleSection(e) {
        if (e.target.textContent === 'My Ads') {
            setAds(myAds)
            setName('My')
            setMessage('You have not posted any Ads yet')
        } else {
            setAds(myFollowedAds)
            setName('Followed')
            setMessage('You have not followed any Ads yet')
        }
        setToggle(true)
    }

    useEffect(() => {
        setLoading(true)

        firebase.auth.onAuthStateChanged((x) => {
            if (x) {
                if (toast === 'logged' || toast === 'deleted') {
                    setTimeout(() => {
                        setToast('')
                    }, 2000)
                }
                setUser(firebase.auth.currentUser.email)
                setLoading(true)
                firebase.getAds().then((res) => {
                    let fetched = []
                    for (let key in res.data) {
                        fetched.unshift({
                            id: key,
                            ...res.data[key]
                        })
                    }
                    setFollowedAds(fetched.filter(x => x.followingUsers.includes(user)))
                    setMyAds(fetched.filter(x => x.email === user))
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    history.push(`/network-error`)
                })
            }
        });

    }, [user, history, ads, setUser, setToast, toast])

    return (
        <div className="container search">
            {loading
                ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                : <div>
                    {toast === 'deleted' ? <SuccessAlert message='Ad closed sucessfully' /> : null}
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron prof">
                                <h1>{user}'s Profile:</h1>
                                <img src={icon} alt="" width="150px" />
                                <div className="profile">
                                    <button id="myAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">My Ads</button>
                                    <button id="followedAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">Followed Ads</button>
                                    <button onClick={logout} className="btn-primary shadow-none">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {toggle
                            ? <div> {loading
                                ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                                : <AdsListing ads={ads} name={name} message={message} />}
                            </div>
                            : null
                        }
                    </div>
                </div>
            }
        </div>

    )
}

export default Profile