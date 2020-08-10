import React, { useState, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory, } from 'react-router-dom'
import firebase from '../../firebase'
import { UserContext } from '../../Store'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'


const Register = () => {

    const [, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, errors, watch } = useForm()
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = ({ password, email }) => {
        localStorage.setItem('loggingIn', ' yes')
        setLoading(true)
        firebase.auth.createUserWithEmailAndPassword(email, password).then(() => {
            setUser(email)
            toast.success('Sucessfully logged in')
            localStorage.getItem('prevPath') ? history.push(`${localStorage.getItem('prevPath')}`) : history.push('/profile')
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={handleSubmit(onSubmit)} >
                        <h1 className="title">Register</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" ref={register({
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })} />
                        {errors.email && (<p className="err">⚠ The email should be a valid one</p>)}
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" ref={register({
                            required: true,
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        })} />
                        {errors.password && (<p className="err">⚠ The password should consist of at least 6 characters, one letter and one number</p>)}
                        <input type="password" name="rePassword" className="form-control mb-4" placeholder="Repeat password" ref={register({
                            validate: value => value === password.current || '⚠ The passwords do not match'
                        })} />
                        {errors.rePassword && <p className="err">{errors.rePassword.message}</p>}
                        <button className="btn" type="submit">Register</button>
                        {loading ? <div><Loader /></div> : null}
                        <p>Already a member?&nbsp;
                        <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register