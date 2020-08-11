import React, { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import categories from '../../utils/categories'
import firebase from '../../firebase'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import SearchForm from '../../components/search-form'
import { toast } from 'react-toastify'


const Category = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [ads, setAds] = useState([])
    const [name, setName] = useState('')
    const urlEnd = useParams().name
    const category = categories.filter(x => x.link === urlEnd)[0]



    useEffect(() => {
        if (category) {
            window.scrollTo(0, 0)
            localStorage.removeItem('prevPath')
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
                setMessage(`There are no Ads in ${category.name} yet`)
                setName(category.name)
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message)
                console.log(err)
                history.push(`/network-error`)
            })
        }
    }, [urlEnd, history, category])

    if (!category) {
        toast.error('There is no such category')
        return <Redirect to='/not-found' />
    } else {
        return (
            <div >
                {loading
                    ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                    : <div className="container search">
                        <div className="row">
                            <div className="col">
                                <div className="jumbotron">
                                    <h1>{category.name}</h1>
                                    <h1>
                                        <img src={category.url} alt="" width="200px" />
                                    </h1>
                                    <SearchForm />
                                </div>
                                <AdsListing ads={ads} name={name} message={message} />
                            </div>
                        </div>
                    </div>
                }
            </div >
        )
    }
}

export default Category