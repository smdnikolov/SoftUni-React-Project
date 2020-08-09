import React, { useState, useContext, } from 'react'
import { Link, useHistory, } from 'react-router-dom'
import firebase from '../../firebase'
import { UserContext } from '../../Store'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'


const Register = () => {

    const [, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const register = (event) => {
        event.preventDefault()
        localStorage.setItem('loggingIn', ' yes')
        const { email, password, rePassword } = event.target.elements
        if (rePassword.value === password.value) {
            setLoading(true)
            firebase.auth.createUserWithEmailAndPassword(email.value, password.value).then(() => {
                setUser(email.value)
                toast.success('Sucessfully logged in')
                localStorage.getItem('prevPath') ? history.push(`${localStorage.getItem('prevPath')}`) : history.push('/profile')
            }).catch(err => {
                console.log(err)
                toast.error(err.message)
                setLoading(false)
            })
        } else {
            toast.error('Passwords must match')
        }
    }

    return (
        <div className="container">
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