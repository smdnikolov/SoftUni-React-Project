import React, { useState, useContext } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { UserContext } from '../../Store'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import ErrorAlert from '../../components/error-alert'

function Login() {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('')

    async function signUp(event) {

        event.preventDefault()
        const { email, password } = event.target.elements
        await firebase.signUp(email.value, password.value).then(() => {
            setLoading(true)
            firebase.auth.onAuthStateChanged(() => {
                if (firebase.auth.currentUser) {
                    localStorage.setItem('user', `${firebase.auth.currentUser.email}`)
                    setUser(localStorage.getItem('user'))
                    if (localStorage.getItem('prevPath') !== '') {
                        history.push(localStorage.getItem('prevPath'))
                        localStorage.setItem('prevPath', '')
                    } else {
                        history.push('/profile')
                    }
                }
            })
        }).catch(err => {
            console.log(err.message)
            setError(err.message)
        })
    }

    if (user) {
        return <Redirect to='/' />
    }

    return (
        <div className="container">
            {error ? <ErrorAlert message={error} /> : null}
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