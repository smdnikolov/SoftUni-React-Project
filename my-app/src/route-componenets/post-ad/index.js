import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { toast } from 'react-toastify'


const PostAd = () => {

    const { register, handleSubmit, errors } = useForm()
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

    const onSubmit = (data) => {
        setLoading(true)
        let x = data.price
        x = Number(x).toFixed(2)
        data.price = x
        data.date = getCurrentDate()
        data.followingUsers = ['тест']
        data.email = firebase.auth.currentUser.email
        firebase.postAd(data).then((res) => {
            setLoading(false)
            toast.success("Ad posted successfully")
            history.push(`/details/${res.data.name}`)
        }).catch(err => {
            setLoading(false)
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
                    <form className="form" onSubmit={handleSubmit(onSubmit)} >
                        <h1 className="title">Post An Ad</h1>
                        <p>Title</p>
                        <input type="text" name="title" className="form-control mb-4" placeholder="Title" ref={register({
                            required: true, minLength: 3
                        })} />
                        {errors.title && (<p className="err">⚠ The title should consist of atleast 3 characters</p>)}
                        <p>Phone</p>
                        <input type="text" name="phoneNUmber" className="form-control mb-4" placeholder="Phone in +359-xxx-xx-xx-xx format" ref={register({
                            required: true, pattern: /^[+]359*-[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/
                        })} />
                        {errors.phoneNUmber && (<p className="err">⚠ The Phone should be in "+359-000-00-00-00" format</p>)}
                        <p>Image URL</p>
                        <input type="text" name="imageUrl" className="form-control mb-4" placeholder="https://"
                            ref={register({
                                required: true, pattern: /^(https?:)\/\/.*\.(?:png|jpg|gif|svg|webp)$/gm
                            })} />
                        {errors.imageUrl && (<p className="err">⚠ The Image URL shoudl start with "https://" and end with a valid image format</p>)}
                        <p>City</p>
                        <select type="text" className="form-control mb-4" placeholder="City" name="city" ref={register()}>
                            <option value="Sofia">Sofia</option>      selected
                            <option value="Plovdiv">Plovdiv</option>
                            <option value="Varna">Varna</option>
                            <option value="Burgas">Burgas</option>
                        </select>
                        <p>Price</p>
                        <input type="text" className="form-control mb-4" placeholder="Price in 0.00" name="price" ref={register({
                            required: true, pattern: /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/
                        })} />
                        {errors.price && (<p className="err">⚠ Price should be in "0.00" format</p>)}
                        <p>Category</p>
                        <select type="text" className="form-control mb-4" placeholder="Category" name="category" ref={register()}>
                            <option value="Homes">Homes</option>      selected
                        <option value="Cars">Cars</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <p>Condition</p>
                        <select type="text" className="form-control mb-4" placeholder="City" name="condition" ref={register()}>
                            <option value="New">New</option>      selected
                        <option value="Used">Used</option>
                        </select>
                        <p>Description</p>
                        <textarea name="description" className="form-control mb-4" cols="30" rows="5" placeholder="Description" ref={register({ required: true, minLength: 10 })} />
                        {errors.description && (<p className="err">⚠ The description should consist of at least ten characters</p>)}
                        <button className="btn shadow-none">Post</button>
                        {loading ? <div><Loader /></div> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostAd