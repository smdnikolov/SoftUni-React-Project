import React, { useEffect, setState } from 'react'
import Loader from '../../components/loader'
import BrowseCategories from '../../components/browse-categories'



const Home = () => {

    const [loading, setLoading] = setState(true)

    useEffect(() => { localStorage.removeItem('prevPath') })

    return (
        <div>
            {loading
                ? <div className="container jumbotron"><h1>Loading</h1><Loader /></div>
                : <div className="container search">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron">
                                <h1>Welcome to the Online Market</h1>
                                <p>Browse the Categories to find what you need</p>
                                <BrowseCategories setter={setLoading} setting={false} />
                            </div>
                        </div>
                    </div >
                </div >
            }
        </div>

    )
}

export default Home