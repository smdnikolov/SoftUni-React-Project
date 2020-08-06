import React, { useState, useEffect } from 'react'
import ButtonLink from '../link-button'
import logo from '../../utils/logo.png';
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

function Header(props) {

    const [user, setUser] = useState({})
    const authListener = () => {
        firebase.auth.onAuthStateChanged((fbUser) => {
            fbUser ? setUser(fbUser) : setUser(null)
        })
    }
    useEffect(() => {
        authListener()
    })

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src={logo} width="105" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {user
                        ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <ButtonLink link='/post-ad' name='Post Ad' />
                            </li>
                            <li className="nav-item active">
                                <ButtonLink link='/profile' name='Profile' />
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <ButtonLink link='/login' name='Login' />
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header