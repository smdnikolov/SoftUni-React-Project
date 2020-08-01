import React from 'react'
import notFoundImg from '../../utils/output-onlinepngtools.png'
import LinkButton from '../../components/link-button'




function NotFound() {

    return (

        <div className="container jumbotron">
            <LinkButton link="/" name="Go Home" />
            <div className="row">
                <div className="col">
                    <img src={notFoundImg} width="100%" alt="" />
                </div>

            </div>
            
        </div>
    )
}

export default NotFound