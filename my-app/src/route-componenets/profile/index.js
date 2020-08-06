import React, { useContext, useState, useEffect } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { UserContext, ToastContext } from '../../Store'
import { useHistory } from 'react-router-dom'
import SuccessAlert from '../../components/success-alert'

function Profile() {

    const history = useHistory()
    const [ads, setAds] = useState(null)
    const [myAds, setMyAds] = useState(null)
    const [myFollowedAds, setFollowedAds] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [toast, setToast] = useContext(ToastContext)
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')



    useEffect(() => {

        if ((toast === 'logged' || toast === 'deleted') && !flag) {
            setTimeout(() => {
                setToast('')
            }, 2000)
        }
    }, [setToast, toast, flag])


    useEffect(() => {
        let mount = true;
        firebase.auth.onAuthStateChanged(async (x) => {
            if (x) {
                setUser(firebase.auth.currentUser.email)
                setLoading(true)
                await firebase.getAds().then((res) => {
                    if (mount) {
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
                        setFlag(false)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setFlag(false)
            }
        });
        return () => { mount = false }
    }, [setUser, user, ads])


    async function logout() {
        debugger
        try {
            firebase.logOut()
            setToast('loggedOut')
            localStorage.clear()
        } catch (error) {
            console.log(error)
            history.push('/network-error')
        }
        return
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

    return (
        <div className="container search">
            {flag
                ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                : <div>
                    {toast === 'deleted' ? <SuccessAlert message='Ad closed sucessfully' /> : null}
                    {toast === 'logged' ? <SuccessAlert message='Logged in sucessfully' /> : null}
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron prof">
                                <h1>{user}'s Profile:</h1>
                                <img src={icon} alt="" width="150px" />
                                <div className="profile">
                                    <button id="myAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">My Ads</button>
                                    <button id="followedAds" onClick={(e) => toggleSection(e)} className="btn-primary shadow-none">Followed Ads</button>
                                    <button onClick={() => logout(() => history.push('/login'))} className="btn-primary shadow-none">Logout</button>
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