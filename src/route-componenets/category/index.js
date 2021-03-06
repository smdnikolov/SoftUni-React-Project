import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import categories from '../../utils/categories'
import firebase from '../../firebase'
import AdsListing from '../../components/ad-listing'
import Loader from '../../components/loader'
import SearchForm from '../../components/search-form'
import { toast } from 'react-toastify'
import { Img, } from 'react-image'
import ImageLoader from '../../components/image-loader'


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
        } else {
            toast.error('There is no such category')
            history.push('/not-found')
        }
    }, [urlEnd, history, category])


    return (
        <div >
            {loading
                ? <div className="container jumbotron"><h1>Loading</h1><Loader /></div>
                : <div className="container search">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron">
                                <h1>{category.name}</h1>
                                <h1>
                                    <Img src={category.url} alt="" width="200px" loader={<ImageLoader />} />
                                </h1>
                                <SearchForm />
                            </div>
                            <AdsListing ads={ads} name={name} message={message} />
                        </div>
                    </div>
                </div>}
        </div >
    )
}

export default Category