import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import notFoundImg from '../../utils/networkError.png'
import { Img, } from 'react-image'
import ImageLoader from '../../components/image-loader'



const NetworkError = () => {
    const history = useHistory()
    let styles = {
        margin: '50px',
    };
    useEffect(() => { localStorage.removeItem('prevPath') })
    return (
        <div className="container jumbotron error-page">
            <button className="btn btn-primary shadow-none" style={styles} onClick={() => history.push('/')}>Take Me Home</button>
            <h1>Network Error :(</h1>
            <div className="row">
                <div className="col">
                    <Img src={notFoundImg} width="30%" alt="" loader={<ImageLoader />} />
                </div>
            </div>
        </div>
    )
}

export default NetworkError