import React, { useContext, useState, useEffect } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import ads from '../../utils/testAd'
import firebase from '../../firebase.js'
import { UserContext } from '../../Store'
import { useHistory, Redirect } from 'react-router-dom'

function Profile() {

    const history = useHistory()
    const name = "My ads"
    const [myAds, setMyAds] = useState(null)
    const [myFollowedAds, setFollowedAds] = useState(null)
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    async function logout() {
        firebase.logOut().then(() => {
            localStorage.setItem('user', '')
            setUser(localStorage.getItem('user'))
            history.push('/login')
        }).catch(() => history.push('/network-error'))
    }
    function toggleSection(e, id, secondId) {

        const section = document.getElementById(id)
        const button = e.target
        
        if (button.textContent !== 'Hide') {
            button.textContent = "Hide"
            section.style.display = button.useContext === 'Hide' ? 'none' : 'inline'

        } else {
            button.textContent = id === 'myAds' ? 'My Ads' : 'Followed Ads'
            section.style.display = 'none'
        }
        const secondButton = document.getElementById(secondId)

        // if (section !== null && secondButton !== null) {

        //     // e.target.textContent = e.target.textContent !== 'Hide' ? button.textContent : "Hide"
        //     button.textContent = button.textContent !== 'Hide' ? 'Followed Ads' : 'Hide'


        // }
        // section.style.display = button.useContext === 'Hide' ? 'none' : 'inline'
    }

    useEffect(() => {
        let unmounted = false;
        firebase.getAds().then((res) => {
            if (!unmounted) {
                let fetched = []
                for (let key in res.data) {
                    fetched.unshift({
                        id: key,
                        ...res.data[key]
                    })
                }
                setFollowedAds(fetched.filter(x => x.followingUsers.includes(user)))
                setMyAds(fetched.filter(x => x.email === user))
            }

        }).catch(() => {
            if (!unmounted) {
                history.push(`/network-error`)
            }
        })
        return () => { unmounted = true };
    }, [user, history])

    if (!user) {
        return <Redirect to='/login' />
    }

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>{localStorage.getItem('user')}'s Profile:</h1>
                        <img src={icon} alt="" width="150px" />
                        <div className="profile">
                            <button id="myAds" onClick={(e) => toggleSection(e, 'profile-list-id', 'follwedAds')} className="btn-primary shadow-none">My Ads</button>
                            <button id="follwedAds" onClick={(e) => toggleSection(e, 'profile-list-id', 'myAds')} className="btn-primary shadow-none">Followed Ads</button>
                            <button onClick={() => logout()} className="btn-primary shadow-none">Logout</button>
                        </div>
                        <h1>My Ads</h1>
                    </div>
                </div>
            </div>
            <div id="profile-list-id" className="profile-list"> {loading
                ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                : <AdsListing ads={[]} name={name === 'My' ? 'My ' : 'Followed'} />}
            </div>
        </div>

    )
}

export default Profile