import React from 'react'

const Pagination = ({ perPage, totalAds, paginate }) => {

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalAds / perPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className='pag'>
            <ul className='pagination'>
                {pageNumbers.map(x => (
                    <li className='page-item' key={x}>
                        <a onClick={(e) => paginate(x, e)} href='#ad-list' className='page-link'>{x}</a>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
export default Pagination