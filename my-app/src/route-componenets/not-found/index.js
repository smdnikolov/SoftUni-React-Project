import React from 'react'
import notFoundImg from '../../utils/error-404.png'
import LinkButton from '../../components/link-button'




function NotFound() {

    return (

        <div className="container jumbotron err">
            <LinkButton link="/" name="Go Home" className='error-btn'/>
            <h1>We could not find what You were looking for :(</h1>

            <div className="row">
                <div className="col">
                    <img src={notFoundImg} width="30%" alt="" />
                </div>
            </div>

        </div>
    )
}

export default NotFound