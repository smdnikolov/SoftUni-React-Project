import React, { useState, useEffect, useContext, } from 'react';
import { useParams, useHistory, Link, useLocation } from 'react-router-dom'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import categories from '../../utils/categories'
import { UserContext } from '../../Store'
import { toast } from 'react-toastify'

function Details() {
    const path = useLocation().pathname
    const id = useParams().id
    const [loading, setLoading] = useState(true)
    const [ad, setAd] = useState({})
    const [ctgUrl, setCtgUrl] = useState(null)
    const [user,] = useContext(UserContext)
    const history = useHistory()
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        localStorage.removeItem('prevPath')
        let mounted = true
        if (mounted) {
            (async function asd() {
                await firebase.getAd(id)
                    .then(res => {
                        if (res.data) {
                            setAd(res.data)
                            setCtgUrl(categories.filter(x => x.name === res.data.category)[0].url)
                            setLoading(false)
                        } else {
                            toast.error('There is no such Ad')
                            history.push('/not-found')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        toast.error(err.message)
                        history.push('/network-error')
                    })
            })()
        }
        return () => {
            mounted = false
        }
    }, [history, id])

    const closeAd = async (id) => {
        await firebase.del(id).then(() => {
            toast.info('Ad deleted successfully')
            history.push('/profile')
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
    }
    const followAd = (id) => {
        let data = JSON.parse(JSON.stringify(ad));
        data.followingUsers.push(user)
        setFlag(true)
        firebase.update(id, (id = data)).then((res) => {
            setAd(data)
            setFlag(false)
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
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
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
    }

    return (
        <div >
            {loading
                ? <div className="container jumbotron">
                    <h1>Loading</h1>
                    <Loader />
                </div>
                : <div>
                    <div className="container jumbotron det">
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
                                                    <button onClick={() => history.push(`/edit/${id}`)} className="btn-primary shadow-none">Edit ✎</button>
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
                                        : <Link onClick={() => localStorage.setItem('prevPath', path)} to='/login'>Login for More</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Details