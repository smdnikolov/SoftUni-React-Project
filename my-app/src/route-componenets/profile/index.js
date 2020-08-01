import React from 'react'
import icon from '../../utils/portfolio.png'
// import LinkButton from '../../components/link-button'
import AdsListing from '../../components/ad-listing'
import categories from '../../utils/categories'
import ads from '../../utils/testAd'




function Profile(props) {

    const name = "My ads"
    const listAds = ads



    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>Hello, asdasdsa@gmail !</h1>
                        <img src={icon} alt="" width="150px" />
                        <div className="profile">
                            <button>My Ads</button>
                            <button>Followed Ads</button>
                            <button>Logout</button>
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
}

export default Profile