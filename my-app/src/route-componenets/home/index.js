import React, { useEffect } from 'react'
import BrowseCategories from '../../components/browse-categories'




function Home() {
    
    useEffect(() => { localStorage.removeItem('prevPath') })

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>Welcome to the Online Market</h1>
                        <p>Browse the Categories to find what you need</p>
                        <BrowseCategories />
                        <h1>Or ...</h1>
                        <form >
                            <input type="text" id="myInput" placeholder="Search for ads..." />
                            <select name="cities" form="citiesform">
                                <option value="Anywhere">Anywhere</option> selected
                                <option value="Sofia">Sofia</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Varna">Varna</option>
                                <option value="Burgas">Burgas</option>
                            </select>
                            <a className="btn  shadow-none" href="/register.html" role="button">Search</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home