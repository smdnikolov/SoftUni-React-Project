import React, { useState, } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrowseCategories from '../../components/browse-categories'


function AdListing(props) {
    const [ads, setAds] = useState(props.ads)
    const [sorting, setSorting] = useState('Latest')
    const location = useLocation().pathname

    function listAd(ad) {
        return (
            <div className="container" key={ad.id}>
                <Link to={"/details/" + ad.id}>
                    <div className="row row-container">
                        <div className="col-sm-4 services-section">
                            <img className="img-card"
                                src={ad.imageUrl}
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
    function sort(e, ads) {
        const sortType = e.target.textContent
        if (sortType === 'Cheapest') {
            const sorted = [...ads].sort((a, b) => a.price - b.price)
            setAds(sorted)
            setSorting(sortType)
        }
        if (sortType === 'Most Expensive') {
            const sorted = [...ads].sort((a, b) => b.price - a.price)
            setAds(sorted)
            setSorting(sortType)
        }
        if (sortType === 'Latest') {
            setAds(ads)
            setSorting(sortType)
        }
    }

    return (
        <div className="jumbotron">
            {ads.length
                ? <div>
                    <h1>Browse {props.name} Ads</h1>
                    <div className="dropdown">
                        <p>Sorted By {sorting}</p>
                        <button className="btn btn-secondary dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button onClick={(е) => sort(е, props.ads)} className="btn-primary shadow-none">Latest</button>
                            <button onClick={(е) => sort(е, ads)} className="btn-primary shadow-none">Cheapest</button>
                            <button onClick={(е) => sort(е, ads)} className="btn-primary shadow-none">Most Expensive</button>
                        </div>
                    </div>
                    <div className="ad-container">{ads.map(x => listAd(x))
                    }</div>
                </div>
                : <div className="ad-container">
                    {props.message}
                    {location !== '/profile' || props.message === 'You have not followed any Ads yet'
                        ? <div>
                            {props.message === 'You have not followed any Ads yet'
                                ? <div>
                                    <h3>Browse Categories</h3>
                                    <BrowseCategories />
                                </div>
                                : <div> <Link to="/post-ad" >Be the first to Post</Link></div>
                            }
                        </div>
                        : <div> <Link to="/post-ad" >Post an Ad</Link></div>
                    }
                </div>
            }
        </div >
    )
}
export default AdListing