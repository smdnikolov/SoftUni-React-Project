import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../Store'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

const Login = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [, setUser] = useContext(UserContext)
    
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = data => {
        localStorage.setItem('loggingIn', ' yes')
        setLoading(true)
        firebase.auth.signInWithEmailAndPassword(data.email, data.password).then((res) => {
            setUser(data.email)
            toast.success('Sucessfully logged in')
            localStorage.getItem('prevPath') ? history.push(`${localStorage.getItem('prevPath')}`) : history.push('/profile')
        }).catch(err => {
            console.log(err)
            toast.error(`${err.message}`)
            setLoading(false)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={handleSubmit(onSubmit)} >
                        <h1 className="title">Login</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" ref={register({
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })} />
                        {errors.email && (<p className="err">⚠ The email should be a valid one</p>)}
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" ref={register({
                            required: true,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
                        })} />
                        {errors.password && (<p className="err">⚠ The password should consist of at least 6 characters, one letter and one number</p>)}
                        <button className="btn shadow-none" type="submit">Login</button>
                        {loading ? <div><Loader /></div> : null}
                        <p>Not a member?&nbsp;
                            <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login