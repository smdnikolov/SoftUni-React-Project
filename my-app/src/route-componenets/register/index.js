import React, { useState } from 'react'
import { Link, } from 'react-router-dom'
import firebase from '../../firebase'



function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
  

    return (
        <div className="container">
            <div className="row">
                <div className="col">

                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <h1 className="title">Register</h1>

                        <input type="email" className="form-control mb-4" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" className="form-control mb-4" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <input type="password" className="form-control mb-4" placeholder="Repeat Password" value={rePassword} onChange={e => setRePassword(e.target.value)} />

                        <button onClick={() => register(email, password)} className="btn form-btn" type="submit">Register</button>

                        <p>Already a member?&nbsp;
                        <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )

    async function register(email, password) {
        try {
            await firebase.register(email, password)
            props.history.replace('/profile')
        } catch (error) {
            alert(error.message)
        }
    }
}

export default Register