import React, { useContext, useState } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import ads from '../../utils/testAd'
import firebase from '../../firebase.js'
import { UserContext } from '../../Store'
import { useHistory, Redirect } from 'react-router-dom'
import ErrorAlert from '../../components/error-alert'


function Profile() {
    const history = useHistory()
    const name = "My ads"
    const listAds = ads
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('')

    async function logout() {
        try {
            await firebase.logOut()
            localStorage.setItem('user', '')
            setUser(localStorage.getItem('user'))
            history.replace('/')
        } catch (error) {
            setError(error.message)
        }
    }

    if (!user) {
        return <Redirect to='/login' />

    }
    return (
        <div className="container">
            {error ? <ErrorAlert message={error} /> : null}
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron">
                            <h1>{localStorage.getItem('user')}'s Profile:</h1>
                            <img src={icon} alt="" width="150px" />
                            <div className="profile">
                                <button>My Ads</button>
                                <button>Followed Ads</button>
                                <button onClick={() => logout()}>Logout</button>
                            </div>

                            <h1>My Ads</h1>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="btn-primary">Cheapest</button>
                                    <button className="btn-primary">Most Expensive</button>
                                    <button className="btn-primary">Latest</button>

                                </div>
                            </div>
                            <AdsListing ads={listAds} name={name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile