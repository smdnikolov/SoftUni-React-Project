import React from 'react'
import categories from '../../utils/categories'
import { Link } from 'react-router-dom'

function Home() {

    const categoriesList = categories.map((category, index) =>
        <li key={index}>
            <Link to={'/category/' + category.link}>
                <img src={category.url} alt="" width="100px" />
                <p>{category.name}</p>
            </Link>
        </li>
    )

    return (
        <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h1>Welcome to the Online Market</h1>
                        <p>Browse the Categories to find what you need
                        </p>
                        <ul className="cat">{categoriesList}</ul>

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
                            <a className="btn btn-primary" href="/register.html" role="button">Search</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Home