import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { toast } from 'react-toastify'


const PostAd = () => {

    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const getCurrentDate = () => {
        const date = new Date()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const year = date.getFullYear()
        return `${day}/${month}/${year} - ${hours}:${mins}`
    }

    const submitAd = (e) => {
        e.preventDefault()
        const { title, phoneNumber, city, price, category, condition, description, imageUrl } = e.target.elements
        const date = getCurrentDate()
        const followingUsers = ['тест']
        const ad = {
            email: firebase.auth.currentUser.email, title: title.value, phoneNUmber: phoneNumber.value, imageUrl: imageUrl.value, city: city.value, price: price.value, condition: condition.value, category: category.value, description: description.value, date, followingUsers
        }
        setLoading(true)
        firebase.postAd(ad).then((res) => {
            setLoading(false)
            toast.success("Ad posted successfully")
            history.push(`/details/${res.data.name}`)
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            history.push('/network-error')
        })
    }
    useEffect(() => {
        localStorage.removeItem('prevPath')
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={submitAd}>
                        <h1 className="title">Post An Ad</h1>
                        <p>Title</p>
                        <input type="text" className="form-control mb-4" placeholder="Title" name="title" />
                        <p>Phone</p>
                        <input type="text" className="form-control mb-4" placeholder="Phone Number" name="phoneNumber" />
                        <p>Image URL</p>
                        <input type="text" className="form-control mb-4" placeholder="Image URL" name="imageUrl" />
                        <p>City</p>
                        <select type="text" className="form-control mb-4" placeholder="City" name="city">
                            <option value="Sofia">Sofia</option>      selected
                        <option value="Plovdiv">Plovdiv</option>
                            <option value="Varna">Varna</option>
                            <option value="Burgas">Burgas</option>
                        </select>
                        <p>Price</p>
                        <input type="number" min="0" step=".01" className="form-control mb-4" placeholder="Price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <p>Category</p>
                        <select type="text" className="form-control mb-4" placeholder="Category" name="category">
                            <option value="Homes">Homes</option>      selected
                        <option value="Cars">Cars</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <p>Condition</p>
                        <select type="text" className="form-control mb-4" placeholder="City" name="condition">
                            <option value="New">New</option>      selected
                        <option value="Used">Used</option>
                        </select>
                        <p>Description</p>
                        <textarea name="description" className="form-control mb-4" cols="30" rows="5" placeholder="Description" />
                        <button className="btn shadow-none">Post</button>
                        {loading ? <div><Loader /></div> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostAd