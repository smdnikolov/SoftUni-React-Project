import React, { useState, useEffect, useContext } from 'react';
import AdsListing from '../../components/ad-listing'
import { QueryContext } from '../../Store'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import categories from '../../utils/categories'
import Loader from '../../components/loader'
import firebase from '../../firebase'
import { toast } from 'react-toastify'

// import AdsListing from '../../components/ad-listing'

const Search = () => {

    const { register, handleSubmit } = useForm()
    const history = useHistory()
    history.listen(() => {
        localStorage.removeItem('query')
    });

    const [message, setMessage] = useState('')
    const [ads, setAds] = useState([])
    const [query, setQuery] = useContext(QueryContext)
    const [loading, setLoading] = useState(true)
    const categoriesSelect = categories.map(x => <option key={x.name} value={x.name}>{x.name}</option>)

    const searchAds = (data) => {
        localStorage.setItem('query', JSON.stringify(data))
        setQuery({ ...data })
        setLoading(true)
    }


    useEffect(() => {

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
            fetchedData = fetchedData.filter((x) => {
                if (query.category === 'any' && query.city === 'any' && query.search === '') {
                    return true
                } else if (query.category === 'any' && query.city === 'any' && query.search !== '') {
                    return x.title.includes(query.search)

                } else if (query.category !== 'any' && query.city === 'any' && query.search === '') {
                    return x.category === query.category
                } else if (query.category !== 'any' && query.city === 'any' && query.search !== '') {
                    return x.category === query.category && x.title.includes(query.search)

                } else if (query.category !== 'any' && query.city !== 'any' && query.search === '') {
                    return x.category === query.category && x.city === query.city
                } else if (query.category !== 'any' && query.city !== 'any' && query.search !== '') {
                    return x.category === query.category && x.city === query.city && x.title.includes(query.search)

                } else if (query.category === 'any' && query.city !== 'any' && query.search === '') {
                    return x.city === query.city
                } else if (query.category === 'any' && query.city !== 'any' && query.search !== '') {
                    return x.city === query.city && x.title.includes(query.search)
                }
                else {
                    return false
                }
            })

            setAds(fetchedData)
            !ads.length ? setMessage(`We could not find anything to match your search`) : setMessage('')
            setLoading(false)
        }).catch((err) => {
            toast.error(err.message)
            console.log(err)
            history.push(`/network-error`)
        })
    }, [setLoading, history, query, ads.length])

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    {loading
                        ? <div className="jumbotron"><h1>Loading</h1><Loader /></div>
                        : <div>
                            <div className="jumbotron">
                                <form className="search-form" onSubmit={handleSubmit(searchAds)}>
                                    <input name='search' defaultValue={query.search} type="text" id="myInput" placeholder="Search for ads..." ref={register()} />
                                    <select name="city" defaultValue={query.city} ref={register()}>
                                        <option value="any">Anywhere</option>
                                        <option value="Sofia">Sofia</option>
                                        <option value="Plovdiv">Plovdiv</option>
                                        <option value="Varna">Varna</option>
                                        <option value="Burgas">Burgas</option>
                                    </select>
                                    <select name="category" defaultValue={query.category} ref={register()} >
                                        <option value='any'>Any category</option>
                                        {categoriesSelect}
                                    </select>
                                    <button className="btn  shadow-none" >Search </button>
                                </form>
                            </div>
                            {ads.length
                                ? <AdsListing ads={ads} message={message} />
                                : <div className="jumbotron">
                                    <h1>{message}</h1>
                                </div>}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Search
