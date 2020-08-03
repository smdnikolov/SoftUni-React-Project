import React, { useState, useContext } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import firebase from '../../firebase'
import { UserContext } from '../../Store'



function Login() {
    const history = useHistory()
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('')
    if (user) {
        return <Redirect to='/' />
    }
    return (
        <div className="container">
            {error ? <div><div className="alert alert-danger" role="alert">{error}</div></div> : null}
            <div className="row">
                <div className="col">
                    <form className="form" onSubmit={signUp} >
                        <h1 className="title">Login</h1>
                        <input type="text" name="email" className="form-control mb-4" placeholder="E-mail" />
                        <input type="password" name="password" className="form-control mb-4" placeholder="Password" />
                        <button className="btn form-btn" type="submit">Login</button>
                        <p>Not a member?&nbsp;
                            <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )

    async function signUp(event) {
        event.preventDefault()
        const { email, password } = event.target.elements
        try {
            await firebase.signUp(email.value, password.value)
            firebase.auth.onAuthStateChanged(() => {
                if (firebase.auth.currentUser) {
                    localStorage.setItem('user', `${firebase.auth.currentUser.email}`)
                    setUser(localStorage.getItem('user'))
                }
            })
            history.replace('/profile')
        } catch (error) {
            setError(error.message)
        }
    }
}

export default Login