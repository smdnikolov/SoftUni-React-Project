import React from 'react'
import {Link} from 'react-router-dom'
import categories from '../../utils/categories'

function BrowseCategories() {
    const categoriesList = categories.map((category, index) =>
        <li key={index}>
            <Link to={'/category/' + category.link}>
                <img src={category.url} alt="" width="100px" />
                <p>{category.name}</p>
            </Link>
        </li>
    )
    return <ul className="cat">{categoriesList}</ul>
}
export default BrowseCategories

