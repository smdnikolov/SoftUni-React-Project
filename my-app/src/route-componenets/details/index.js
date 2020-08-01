import React from 'react';
// import { Link } from 'react-router-dom';
import ads from '../../utils/testAd'
import categories from '../../utils/categories'


function Details(props) {

    const ad = ads[0]
    const categoryUrl = categories.filter(x => x.name === ad.category)[0].url

    return (
        <div>
            <div className="container jumbotron search">
                <h1>{ad.title}</h1>
                <div className="row">
                    <div className="col">

                        <div>
                            <img src={ad.imgUrl} alt=""
                                width="90%" />
                        </div>

                        <div className="details">
                            <p><span role="img" aria-label="">📱</span>: {ad.phone}</p>
                            <hr />
                            <p><span role="img" aria-label="">📧</span>: {ad.email}</p>
                            <hr />
                            <p><span role="img" aria-label="">🏙️</span>: {ad.city}</p>
                            <hr />
                            <p><span role="img" aria-label="">💰</span>: {ad.price} BGN</p>
                            <hr />
                            <p><span role="img" aria-label="">📅</span>: {ad.date}</p>
                            <hr />
                            Category: <img src={categoryUrl} alt="" width="50px" />
                            <hr />
                            <p>Condition:{ad.condition}</p>
                            <hr />
                            <p>Description: </p>
                            <p>{ad.description} </p>
                            <hr />
                            <button className="btn-primary">Follow</button>
                            <button className="btn-primary">Forget</button>
                            <hr />
                            <button className="btn-primary">Edit ✎</button>
                            <button className="btn-primary">Close 🗙</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Details