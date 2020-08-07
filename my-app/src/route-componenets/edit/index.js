import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Store'
import { useHistory, useParams } from 'react-router-dom'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { toast } from 'react-toastify'



function EditAd() {
    const [user,] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const id = useParams().id
    const [flag, setFlag] = useState(true)
    const [vals, setVals] = useState({})

    async function submitAd(e) {
        e.preventDefault()

        setLoading(true)
        let data = JSON.parse(JSON.stringify(vals));
        firebase.update(id, data).then((res) => {
            toast.info('Ad has been edited')
            history.push('/details/' + id)
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        localStorage.removeItem('prevPath')
    }, [])

    useEffect(() => {
        firebase.getAd(id).then((res) => {
            if (!res.data) {
                history.push("/not-found");
                toast.error('There is no such Ad')
            } else if (res.data.email !== user) {
                toast.warn('You have no permission to edit this Ad')
                history.push("/");
            } else {
                setVals(res.data)
                setFlag(false)
            }
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
    }, [history, id, user])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {flag
                        ? <div className="jumbotron">
                            <h1>Loading</h1>
                            <Loader />
                        </div>
                        : <form className="form" onSubmit={submitAd}>
                            <h1 className="title">Edit Ad</h1>
                            <p>Title</p>
                            <input type="text" className="form-control mb-4" placeholder="Title" name="title" defaultValue={vals.title} onChange={e => setVals({ ...vals, title: e.target.value })} />
                            <p>Phone</p>
                            <input type="text" className="form-control mb-4" placeholder="Phone Number" name="phoneNUmber" defaultValue={vals.phoneNUmber} onChange={e => setVals({ ...vals, phoneNUmber: e.target.value })} />
                            <p>Image URL</p>
                            <input type="text" className="form-control mb-4" placeholder="Image URL" name="title" defaultValue={vals.imageUrl} onChange={e => setVals({ ...vals, imageUrl: e.target.value })} />
                            <p>City</p>
                            <select type="text" className="form-control mb-4" placeholder="City" name="city" defaultValue={vals.city} onChange={e => setVals({ ...vals, city: e.target.value })}>
                                <option value="Sofia">Sofia</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Varna">Varna</option>
                                <option value="Burgas">Burgas</option>
                            </select>
                            <p>Price</p>
                            <input type="number" min="0" step=".01" className="form-control mb-4" placeholder="Price" name="price" defaultValue={vals.price} onChange={e => setVals({ ...vals, price: e.target.value })} />
                            <p>Category</p>
                            <select type="text" className="form-control mb-4" placeholder="Category" name="category" defaultValue={vals.category} onChange={e => setVals({ ...vals, category: e.target.value })} >
                                <option value="Homes">Homes</option>
                                <option value="Cars">Cars</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Misc">Misc</option>
                            </select>
                            <p>Condition</p>
                            <select type="text" className="form-control mb-4" placeholder="City" name="condition" defaultValue={vals.condition} onChange={e => setVals({ ...vals, condition: e.target.value })} >
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                            <p>Description</p>
                            <textarea name="description" className="form-control mb-4" cols="30" rows="5" placeholder="Description" defaultValue={vals.description} onChange={e => setVals({ ...vals, description: e.target.value })} />
                            <button className="btn shadow-none">Edit</button>
                            {loading ? <div><Loader /></div> : null}
                        </form>
                    }
                </div>
            </div>
        </div >
    )
}

export default EditAd