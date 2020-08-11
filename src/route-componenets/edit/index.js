import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Store'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import Loader from '../../components/loader'
import firebase from '../../firebase.js'
import { toast } from 'react-toastify'



const EditAd = () => {
    const [user,] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const id = useParams().id
    const [flag, setFlag] = useState(true)
    const [vals, setVals] = useState({})

    const onSubmit = (data) => {
        setLoading(true)
        let x = data.price
        x = Number(x).toFixed(2)
        data.price = x
        data.date = vals.date
        data.followingUsers = vals.followingUsers
        data.email = firebase.auth.currentUser.email
        firebase.update(id, data).then((res) => {
            setLoading(false)
            toast.info('Ad has been edited')
            history.push('/details/' + id)
        }).catch(err => {
            setLoading(false)
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
                        : <form className="form" onSubmit={handleSubmit(onSubmit)} >
                            <h1 className="title">Edit Ad</h1>
                            <p>Title</p>
                            <input type="text" className="form-control mb-4" placeholder="Title" name="title" defaultValue={vals.title} ref={register({
                                required: true, minLength: 3
                            })} />
                            {errors.title && (<p className="err">⚠ The title should consist of atleast 3 characters</p>)}
                            <p>Phone</p>
                            <input type="text" className="form-control mb-4" placeholder="Phone in +359-xxx-xx-xx-xx format" name="phoneNUmber" defaultValue={vals.phoneNUmber} ref={register({
                                required: true, pattern: /^[+]359*-[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/
                            })} />
                            {errors.phoneNUmber && (<p className="err">⚠ The Phone should be in "+359-000-00-00-00" format</p>)}
                            <p>Image URL</p>
                            <input type="text" className="form-control mb-4" placeholder="https://" name="imageUrl" defaultValue={vals.imageUrl} ref={register({
                                required: true, pattern: /^(https?:)\/\/.*\.(?:png|jpg|gif|svg|webp)$/gm
                            })} />
                            {errors.imageUrl && (<p className="err">⚠ The Image URL shoudl start with "https://" and end with a valid image format</p>)}
                            <p>City</p>
                            <select type="text" className="form-control mb-4" placeholder="City" name="city" defaultValue={vals.city} ref={register()}>
                                <option value="Sofia">Sofia</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Varna">Varna</option>
                                <option value="Burgas">Burgas</option>
                            </select>
                            <p>Price</p>
                            <input type="text" className="form-control mb-4" placeholder="Price in 0.00" name="price" defaultValue={vals.price} ref={register({
                                required: true, pattern: /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/
                            })} />
                            {errors.price && (<p className="err">⚠ Price should be in "0.00" format</p>)}
                            <p>Category</p>
                            <select type="text" className="form-control mb-4" placeholder="Category" name="category" defaultValue={vals.category} ref={register()}>
                                <option value="Homes">Homes</option>
                                <option value="Cars">Cars</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Misc">Misc</option>
                            </select>
                            <p>Condition</p>
                            <select type="text" className="form-control mb-4" placeholder="City" name="condition" defaultValue={vals.condition} ref={register()}>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                            <p>Description</p>
                            <textarea name="description" className="form-control mb-4" cols="30" rows="5" placeholder="Description" defaultValue={vals.description} ref={register({ required: true, minLength: 10 })} />
                            {errors.description && (<p className="err">⚠ The description should consist of at least ten characters</p>)}
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