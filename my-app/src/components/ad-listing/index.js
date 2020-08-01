import React from 'react'
import { Link } from 'react-router-dom'

function AdListing(props) {

    function listAd(ad) {
        return (
            <div className="container" key={ad._id}>
                <Link to={"/details/" + ad._id}>
                    <div className="row row-container">
                        <div className="col-sm-4 services-section">
                            <img className="img-card"
                                src={ad.imgUrl}
                                alt="" />
                        </div>
                        <div className="col-sm-8 services-section">
                            <div className="space rel">
                                <p > {ad.title} </p>
                                <p > Category » {ad.category} </p>
                                <p > City » {ad.city}</p>
                                <p > Price » {ad.price} BGN </p>
                                <p > Created at » {ad.date}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>)
    }
    // function sortHighPrice() {

    // }
    // function sortLowPrice() {

    // }
    // function sortLatest() {

    // }

    return (
        <div className="jumbotron">
            {props.ads.length

                ? <div>
                    <h1>All {props.name} Ads</h1>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="btn-primary">Cheapest</button>
                            <button className="btn-primary">Most Expensive</button>
                            <button className="btn-primary">Latest</button>
                        </div>
                    </div>
                    <div className="ad-container">{props.ads.map(x => listAd(x))
                    }</div>
                </div>

                : <div className="ad-container">
                    No Found Ads
            </div>
            }
        </div>
    )
}
export default AdListing