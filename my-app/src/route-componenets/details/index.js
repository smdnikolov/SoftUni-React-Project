import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import categories from '../../utils/categories'




function Details() {

    const id = useParams().id
    const [loading, setLoading] = useState(true)
    const [ad, setAd] = useState(null)
    const [ctgUrl, setCtgUrl] = useState(null)
    const browserHistory = useHistory()


    useEffect(() => {

        firebase.getAd(id).then((res) => {
            if (!res.data) {
                browserHistory.push("/not-found");
            } else {
                setCtgUrl(categories.filter(x => x.name === res.data.category)[0].url)


                setAd(res.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [id, browserHistory])


    return (
        <div>
            {loading
                ? <div className="container jumbotron">
                    <h1>Loading</h1>
                    <Loader />
                </div>
                : <div className="container jumbotron search">
                    <h1>{ad.title}</h1>
                    <div className="row">
                        <div className="col">
                            <div>
                                <img src={ad.imageUrl} alt=""
                                    width="70%" />
                            </div>
                            <div className="details">
                                <p><span role="img" aria-label="">📱</span>: {ad.phoneNUmber}</p>
                                <hr />
                                <p><span role="img" aria-label="">📧</span>: {ad.email}</p>
                                <hr />
                                <p><span role="img" aria-label="">🏙️</span>: {ad.city}</p>
                                <hr />
                                <p><span role="img" aria-label="">💰</span>: {ad.price} BGN</p>
                                <hr />
                                <p><span role="img" aria-label="">📅</span>: {ad.date}</p>
                                <hr />
                            Category: <img src={ctgUrl} alt="" width="50px" />
                                <hr />
                                <p>Condition:{ad.condition}</p>
                                <hr />
                                <p>Description: </p>
                                <p>{ad.description} </p>
                                <hr />
                                <button className="btn-primary">Follow</button>
                                <button className="btn-primary">Forget</button>
                                <hr />
                                <button className="btn-primary">Edit ✎</button>
                                <button className="btn-primary">Close 🗙</button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Details