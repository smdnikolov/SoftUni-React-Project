import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../utils/categories'
import ads from '../../utils/testAd'


function Category(props) {

    const urlEnd = props.match.params.name
    const category = categories.filter(x => x.link === urlEnd)[0]
    let listAds = ads.filter(x => x.category.toLocaleLowerCase() === urlEnd)

    listAds = listAds.map(ad =>
        <div className="container" key={ad._id}>
            <Link to={"/details/" + ad._id}>
                <div className="row row-container">
                    <div className="col-sm-4 services-section">
                        <img className="img-card"
                            src="https://frankfurt.apollo.olxcdn.com/v1/files/jasvo8nv2z1i1-BG/image;s=585x461"
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
        </div>
    )


    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron text-center">
                        <h1>{category.name}</h1>
                        <h1>
                            <img src={category.url} alt="" width="200px" />
                        </h1>
                        <form action="" >
                            <input type="text" id="myInput" placeholder="Find in Cars..." />
                            <select name="cities" form="citiesform">
                                <option value="Anywhere">Anywhere</option> selected
                                <option value="Sofia">Sofia</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Varna">Varna</option>
                                <option value="Burgas">Burgas</option>
                            </select>
                            <Link className="btn btn-primary" to="/register.html" role="button">Search</Link>
                        </form>
                    </div>

                    <div className="jumbotron">
                        {listAds.length

                            ? <div>
                                <h1>All {category.name} Ads</h1>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button className="btn-primary">Cheapest</button>
                                        <button className="btn-primary">Most Expensive</button>
                                        <button className="btn-primary">Latest</button>
                                    </div>
                                </div>
                                <div className="ad-container">{listAds}</div>
                            </div>

                            : <div className="ad-container">
                                No Found Ads
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category