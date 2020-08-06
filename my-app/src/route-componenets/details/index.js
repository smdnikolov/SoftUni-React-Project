import React, { useState, useEffect, } from 'react';
import { useParams, useHistory, Link, useLocation } from 'react-router-dom'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import categories from '../../utils/categories'

function Details() {
    const path = useLocation().pathname
    const id = useParams().id
    const [loading, setLoading] = useState(true)
    const [ad, setAd] = useState(null)
    const [ctgUrl, setCtgUrl] = useState(null)
    const user = localStorage.getItem('user')
    const history = useHistory()
    const [flag, setFlag] = useState(false)

    const closeAd = (id) => {
        firebase.del(id).then(() => {
            history.push('/profile')
        }).catch((err) => {
            history.push('/network-error')
            console.log(err)
        })
    }
    const followAd = (id) => {
        let data = JSON.parse(JSON.stringify(ad));
        data.followingUsers.push(user)
        setFlag(true)
        firebase.update(id, (id = data)).then((res) => {
            setAd(data)
            setFlag(false)
        }).catch((err) => {
            history.push('/network-error')
            console.log(err)
        })
    }
    const forgetAd = (id) => {
        let data = JSON.parse(JSON.stringify(ad));
        const index = data.followingUsers.indexOf(user)
        data.followingUsers.splice(index, 1)
        setFlag(true)
        firebase.update(id, (id = data)).then((res) => {
            setAd(data)
            setFlag(false)
        }).catch((err) => {
            history.push('/network-error')
            console.log(err)
        })
    }


    useEffect(() => {

        firebase.getAd(id).then((res) => {
            if (!res.data) {
                history.push("/not-found");
            } else {
                setCtgUrl(categories.filter(x => x.name === res.data.category)[0].url)
                setAd(res.data)
                setLoading(false)
            }
        }).catch(() => history.push(`/network-error`))

    }, [id, history,])

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
                                {user
                                    ? <div>
                                        {user === ad.email
                                            ? <div>
                                                <button onClick={()=>history.push('/post-ad')}className="btn-primary shadow-none">Edit ✎</button>
                                                <button onClick={() => closeAd(id)} className="btn-primary shadow-none">Close 🗙</button>
                                            </div>
                                            : <div>
                                                {ad.followingUsers.includes(user)
                                                    ? <div>
                                                        {flag
                                                            ? <Loader />
                                                            : <button onClick={() => forgetAd(id)} className="btn-primary shadow-none">Forget</button>
                                                        }
                                                    </div>
                                                    : <div>
                                                        {flag
                                                            ? <Loader />
                                                            : <button onClick={() => followAd(id)} className="btn-primary shadow-none">Follow</button>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    : <Link onClick={() => localStorage.setItem('prevPath', path)} to='/login'>Login to Follow</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Details