import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContext } from '../../Store'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import ErrorAlert from '../../components/error-alert'
import SuccessAlert from '../../components/success-alert'

function Login() {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useContext(ToastContext)
    const [error, setError] = useState('')

    function signUp(event) {

        event.preventDefault()
        const { email, password } = event.target.elements
        firebase.signUp(email.value, password.value).then(() => {
            firebase.auth.onAuthStateChanged((res) => {
                console.log(res)
                setLoading(true)
                localStorage.setItem('logged', 'yes')
                if (localStorage.getItem('prevPath')) {
                    setToast('logged')
                    history.push(`${localStorage.getItem('prevPath')}`)
                    localStorage.removeItem('prevPath')
                } else {
                    history.push(`/profile`)
                }
            })
        }).catch(e => {
            console.log(e)
            setError(e.message)
            setLoading(false)
        })
    }
    useEffect(() => {
        if (localStorage.getItem('logged') === 'yes') {
            setToast('logged')
            return history.push('/')
        }
        if (error) {
            setToast('')
        }
        if (toast === 'loggedOut') {
            setTimeout(() => {
                setToast('')
            }, 2000)
        }
    }, [loading, setToast, toast, error, history])



    return (
        <div className="container">
            {error ? <ErrorAlert message={error} /> : null}
            {toast ? <SuccessAlert message='Successfully logged out' /> : null}
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={signUp} >
                        <h1 className="title">Login</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" />
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" />
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