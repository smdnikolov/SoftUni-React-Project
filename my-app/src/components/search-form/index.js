import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { QueryContext } from '../../Store'
import categories from '../../utils/categories'

const SearchForm = ({ cityValue, categoryValue, searchValue }) => {

    const { register, handleSubmit } = useForm()
    const [, setQuery] = useContext(QueryContext)
    const history = useHistory()
    const categoriesSelect = categories.map(x => <option key={x.name} value={x.name}>{x.name}</option>)

    const searchAds = (data) => {
        localStorage.setItem('query', JSON.stringify(data))
        setQuery({ ...data })
        history.push('/search')
    }

    return (
        <form className="search-form" onSubmit={handleSubmit(searchAds)}>
            <input name='search' defaultValue={searchValue} type="text" id="myInput" placeholder="Search for ads..." ref={register()} />
            <select name="city" defaultValue={cityValue} ref={register()}>

                <option value="any">Anywhere</option>
                <option value="Sofia">Sofia</option>
                <option value="Plovdiv">Plovdiv</option>
                <option value="Varna">Varna</option>
                <option value="Burgas">Burgas</option>
            </select>
            <select name="category" defaultValue={categoryValue} ref={register()} >
                <option value='any'>Any category</option>
                {categoriesSelect}
            </select>
            <button className="btn  shadow-none" >Search </button>
        </form>)
}

export default SearchForm
