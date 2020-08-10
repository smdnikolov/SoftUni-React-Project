import React from 'react'
import { Link } from 'react-router-dom'
import categories from '../../utils/categories'

const BrowseCategories = () => {
    const categoriesList = categories.map((category, index) =>
        <li key={index}>
            <Link to={'/category/' + category.link}>
                <img src={category.url} alt="" width="100px" />
                <p>{category.name}</p>
            </Link>
        </li>
    )
    return <div>
        < ul className="cat">{categoriesList}</ul>
        <form >
            <input type="text" id="myInput" placeholder="Search for ads..." />
            <select name="cities" form="citiesform">
                <option value="Anywhere">Anywhere</option> selected
                                <option value="Sofia">Sofia</option>
                <option value="Plovdiv">Plovdiv</option>
                <option value="Varna">Varna</option>
                <option value="Burgas">Burgas</option>
            </select>
            <button className="btn  shadow-none" >Search </button>
        </form>
    </div>
}
export default BrowseCategories

