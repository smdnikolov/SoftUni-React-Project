import React, { useContext, useState, useEffect } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { UserContext } from '../../Store'
import { useHistory, Redirect } from 'react-router-dom'

function Profile() {

    const history = useHistory()
    const [ads, setAds] = useState(null)
    const [myAds, setMyAds] = useState(null)
    const [myFollowedAds, setFollowedAds] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('')

    function logout() {
        try {
            firebase.logOut()
            setUser(localStorage.getItem('user'))
            history.push('/login')
        } catch (error) {
            history.push('/network-error')
        }
    }
    function toggleSection(e) {
        if (e.target.textContent === 'My Ads') {
            setAds(myAds)
            setMessage('You have not posted any Ads yet')
        } else {
            setAds(myFollowedAds)
            setMessage('You have not followed any Ads yet')
        }
        setToggle(true)
    }
    useEffect(() => {
        if (user) {
            setLoading(true)
            async function getData() {
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
                }).catch(() => {
                    history.push(`/network-error`)
                })
            }
            getData()
        }else{
            return
        }

    }, [user, history, ads, setUser])

    if (!user) {
        return <Redirect to="/login" />
    }

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>{localStorage.getItem('user')}'s Profile:</h1>
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
                        : <AdsListing ads={ads} message={message} />}
                    </div>
                    : null
                }
            </div>

        </div>

    )
}

export default Profile