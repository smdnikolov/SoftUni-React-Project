import React, { useEffect } from 'react'
import Loader from '../../components/loader'
import BrowseCategories from '../../components/browse-categories'



const Home = () => {

    useEffect(() => { localStorage.removeItem('prevPath') })

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>Welcome to the Online Market</h1>
                        <p>Browse the Categories to find what you need</p>
                        <BrowseCategories />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Home