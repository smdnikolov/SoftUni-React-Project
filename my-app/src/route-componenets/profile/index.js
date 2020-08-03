import React, { useContext } from 'react'
import icon from '../../utils/portfolio.png'
import AdsListing from '../../components/ad-listing'
import ads from '../../utils/testAd'
import firebase from '../../firebase.js'
import { UserContext } from '../../Store'
import { useHistory } from 'react-router-dom'


function Profile() {
    const history = useHistory()
    const name = "My ads"
    const listAds = ads
    const [, setUser] = useContext(UserContext)

    return (

        <div className="container search">
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

    )

    async function logout() {
        try {
            await firebase.logOut()
            localStorage.setItem('user', '')
            setUser(localStorage.getItem('user'))
            history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }
}

export default Profile