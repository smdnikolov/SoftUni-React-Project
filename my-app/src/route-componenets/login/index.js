import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../Store'
import firebase from '../../firebase'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

function Login() {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [, setUser] = useContext(UserContext)


    function signUp(event) {
        localStorage.setItem('loggingIn',' yes')
        event.preventDefault()
        const { email, password } = event.target.elements
        if (email.value && password.value) {
            firebase.auth.signInWithEmailAndPassword(email.value, password.value).then((res) => {
                setLoading(true)
                setUser(email.value)
                console.log(localStorage)
                toast.success('Sucessfully logged in')
                localStorage.getItem('prevPath') ? history.push(`${localStorage.getItem('prevPath')}`) : history.push('/profile')
            }).catch(err => {
                console.log(err)
                toast.error(`${err.message}`)
                setLoading(false)
            })
        } else {
            toast.error('Please fill the form')
        }
    }

    return (
        <div className="container">
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