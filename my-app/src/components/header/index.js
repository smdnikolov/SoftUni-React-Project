import React, { Component } from 'react'
import logo from '../../media/logo.png';

let isLoggedIn = false

class Header extends Component {
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="105" alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">

                        {isLoggedIn
                            ? <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="btn btn-primary" href="/post-add.html" role="button">Post Ad</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="btn btn-primary" href="/post-add.html" role="button">Profile</a>
                                </li>
                            </ul>
                            : <ul className="navbar-nav ml-auto">

                                <li className="nav-item active">
                                    <a className="btn btn-primary" href="/login.html" role="button">Login</a>
                                </li>
                            </ul>
                        }


                    </div>
                </div>
            </nav>
        )
    }
}

export default Header