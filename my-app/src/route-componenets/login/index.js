import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'



function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    return (
        <div className="container">
            {error
                ? <div>
                    <div class="alert alert-danger" role="alert">
                        {error}</div>

                </div>
                : <p></p>
            }
            <div className="row">
                <div className="col">

                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <h1 className="title">Login</h1>

                        <input type="text" i className="form-control mb-4" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
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
            props.history.replace('/profile')
        } catch (error) {
            setError(error.message)

        }
    }
}

export default Login