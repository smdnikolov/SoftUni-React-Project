import React from 'react'
import { Link } from 'react-router-dom'
import SearchForm from '../../components/search-form'
import categories from '../../utils/categories'
import { Img, } from 'react-image'

const BrowseCategories = () => {

    const categoriesList = categories.map((category, index) =>
        <li key={index}>
            <Link to={'/category/' + category.link}>
                <Img src={category.url} alt="" width="100px"
                    loader={<ImgLoader />} />
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

