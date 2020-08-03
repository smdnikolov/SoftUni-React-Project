import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../../firebase'
import { UserContext } from '../../Store'



function Login() {
    const history = useHistory()
    const [, setUser] = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    return (
        <div className="container">
            {error
                ? <div>
                    <div className="alert alert-danger" role="alert">
                        {error}</div>

                </div>
                : null
            }
            <div className="row">
                <div className="col">

                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <h1 className="title">Login</h1>

                        <input type="text" className="form-control mb-4" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="Password" />

                        <button onClick={() => signUp(email, password)} className="btn form-btn" type="submit">Login</button>

                        <p>Not a member?&nbsp;
                            <Link to="/register">Register</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )

    async function signUp(email, password) {
        try {
            await firebase.signUp(email, password)
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