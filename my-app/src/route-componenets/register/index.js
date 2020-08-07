import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory, } from 'react-router-dom'
import firebase from '../../firebase'
import { ToastContext, UserContext } from '../../Store'
import Loader from '../../components/loader'
import ErrorAlert from '../../components/error-alert'

function Register() {
    const [, setToast] = useContext(ToastContext)
    const [, setUser] = useContext(UserContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function register(event) {
        event.preventDefault()
        const { email, password, rePassword } = event.target.elements
        if (rePassword.value === password.value) {
            setLoading(true)
            firebase.auth.createUserWithEmailAndPassword(email.value, password.value).then(() => {
                setUser(email.value)
                setToast('logged')
                history.push('/profile')
            }).catch(err => {
                console.log(err)
                setError(err.message)
                setLoading(false)
            })
        } else {
            setError('The passwords must match!')
        }

    }
    useEffect(() => {
        let mount = true
        if (firebase.auth.currentUser && mount) {
            setToast('logged')
            history.push('/')
        }
        return () => mount = false
    }, [history, setToast])

    return (
        <div className="container">
            {error ? <ErrorAlert message={error} /> : null}
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={register}>
                        <h1 className="title">Register</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" />
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" />
                        <input type="password" name="rePassword" className="form-control mb-4" placeholder="Repeat Password" />
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