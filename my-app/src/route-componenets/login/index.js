import React, { Component } from 'react'



class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">

                        <form className="form" action="#!">
                            <h1 className="title">Login</h1>

                            <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />
                            <input type="password" id="defaultLoginFormPassword" className="form-control mb-4"
                                placeholder="Password" />

                            <button className="btn form-btn" type="submit">Sign in</button>

                            <p>Not a member?
                            <a href="/register.html">Register</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login