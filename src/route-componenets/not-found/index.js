import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import notFoundImg from '../../utils/error-404.png'
import { Img, } from 'react-image'
import ImageLoader from '../../components/image-loader'

const NotFound = () => {

    const history = useHistory()
    useEffect(() => { localStorage.removeItem('prevPath') })
    let styles = { margin: '50px' };
    return (
        <div className="container jumbotron error-page">
            <button className="btn btn-primary shadow-none" style={styles} onClick={() => history.push('/')}>Take Me Home</button>
            <h1>We could not find what You were looking for :(</h1>
            <div className="row">
                <div className="col">
                    <Img src={notFoundImg} width="30%" alt="" loader={<ImageLoader />} />
                </div>
            </div>
        </div>
    )
}

export default NotFound