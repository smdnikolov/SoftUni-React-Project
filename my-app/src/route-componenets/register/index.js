import React, { useState, useContext } from 'react'
import { Link, } from 'react-router-dom'
import firebase from '../../firebase'
import { UserContext } from '../../Store'


function Register(props) {
    const [, setUser] = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
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
                        <h1 className="title">Register</h1>

                        <input type="text" className="form-control mb-4" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
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
            firebase.auth.onAuthStateChanged(() => {
                localStorage.setItem('user', `${firebase.auth.currentUser.email}`)
                setUser(localStorage.getItem('user'))
            })
            props.history.replace('/profile')
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

}

export default Register