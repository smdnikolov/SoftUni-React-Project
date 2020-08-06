import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import categories from '../../utils/categories'
import firebase from '../../firebase'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'


function Category() {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [ads, setAds] = useState([])
    const [name, setName] = useState('')
    const urlEnd = useParams().name
    const category = categories.filter(x => x.link === urlEnd)[0]


    useEffect(() => {
        let unmounted = false;
        firebase.getAds().then((res) => {
            if (!unmounted) {
                let fetchedData = []
                for (let key in res.data) {
                    fetchedData.unshift({
                        id: key,
                        ...res.data[key]
                    })
                }
                fetchedData = fetchedData.filter(x => x.category.toLowerCase() === urlEnd)
                setAds(fetchedData)
                setMessage(`There are no Ads in ${category.name} yet`)
                setName(category.name)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
            if (!unmounted) {
                history.push(`/network-error`)
            }
        })
        return () => { unmounted = true };
    }, [urlEnd, history, category.name])

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
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
                            <Link className="btn btn-primary shadow-none" to="/register.html" role="button">Search</Link>
                        </form>
                    </div>
                    {loading
                        ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                        : <AdsListing ads={ads} name={name} message={message} />}
                </div>
            </div>
        </div>
    )
}

export default Category