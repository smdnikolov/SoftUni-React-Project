import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import categories from '../../utils/categories'
import firebase from '../../firebase'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'


function Category() {

    const [loading, setLoading] = useState(true)
    const [ads, setAds] = useState([])
    const urlEnd = useParams().name
    const category = categories.filter(x => x.link === urlEnd)[0]


    useEffect(() => {
        firebase.getAds().then((res) => {
            let fetchedData = []
            for (let key in res.data) {
                fetchedData.unshift({
                    id: key,
                    ...res.data[key]
                })
            }
            fetchedData = fetchedData.filter(x => x.category.toLowerCase() === urlEnd)
            setAds(fetchedData)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [urlEnd])

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
                    {loading
                        ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                        : <AdsListing ads={ads} name={category.name} />}
                </div>
            </div>
        </div>
    )
}

export default Category