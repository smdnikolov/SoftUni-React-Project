import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../utils/categories'
import ads from '../../utils/testAd'
import AdsListing from '../../components/ad-listing'


function Category(props) {

    const urlEnd = props.match.params.name
    const category = categories.filter(x => x.link === urlEnd)[0]
    const listAds = ads.filter(x => x.category.toLocaleLowerCase() === urlEnd)

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
                    <AdsListing ads={listAds} name={category.name} />
                </div>
            </div>
        </div>
    )
}

export default Category