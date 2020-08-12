import React from 'react'
import { Link } from 'react-router-dom'
import SearchForm from '../../components/search-form'
import categories from '../../utils/categories'

const BrowseCategories = ({ setter, setting }) => {

    const setLoading = (setter, setting) => {
        setter(setting)
    }



    const categoriesList = categories.map((category, index) =>
        <li key={index}>
            <Link to={'/category/' + category.link}>
                <img onLoad={setLoading(setter, setting)} src={category.url} alt="" width="100px" />
                <p>{category.name}</p>
            </Link>
        </li>
    )
    return <div>
        < ul className="cat">{categoriesList}</ul>
        <SearchForm />
    </div>
}
export default BrowseCategories

