import React from 'react'
import { Link } from 'react-router-dom'



function Register() {

    return (
        <div className="container">
            <div className="row">
                <div className="col">

                    <form className="form" action="#!">
                        <h1 className="title">Register</h1>

                        <input type="email" className="form-control mb-4" placeholder="E-mail" />
                        <input type="password" className="form-control mb-4"
                            placeholder="Password" />
                        <input type="password" className="form-control mb-4"
                            placeholder="Repeat Password" />

                        <button className="btn form-btn" type="submit">Register</button>

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