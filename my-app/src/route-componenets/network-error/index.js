import React from 'react'
import { useHistory } from 'react-router-dom'
import notFoundImg from '../../utils/networkError.png'




function NetworkError() {
    const history = useHistory()
    let styles = {
        margin: '50px',
    };
    return (
        <div className="container jumbotron err">
            <button className="btn btn-primary shadow-none" style={styles} onClick={() => history.push('/')}>Take Me Home</button>
            <h1>Network Error :(</h1>
            <div className="row">
                <div className="col">
                    <img src={notFoundImg} width="30%" alt="" />
                </div>
            </div>
        </div>
    )
}

export default NetworkError