import React, { useState, useEffect, } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrowseCategories from '../../components/browse-categories'
import Pagination from '../pagination'


const AdListing = (props) => {
    const [ads, setAds] = useState(props.ads)
    const [sorting, setSorting] = useState('Latest')
    const location = useLocation().pathname
    const [perPage,] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastAd = currentPage * perPage
    const indexOfFirstAd = indexOfLastAd - perPage
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd)

    const listAd = (ad) => {
        return (
            <div className="container" key={ad.id}>
                <Link to={"/details/" + ad.id}>
                    <div className="row row-container">
                        <div className="col-sm-4 services-section">
                            <img className="img-card"
                                src={ad.imageUrl}
                                alt="" />
                        </div>
                        <div className="col-sm-8 services-section">
                            <div className="space rel">
                                <p > {ad.title} </p>
                                <p > Category » {ad.category} </p>
                                <p > City » {ad.city}</p>
                                <p > Price » {ad.price} BGN </p>
                                <p > Created at » {ad.date}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>)
    }

    const sortingFunc = (sortType, array) => {
        [...document.getElementsByClassName('active-page')].forEach(x => x.classList.remove('active-page'))
        Array.from(document.getElementsByClassName('page-link'))[0].classList.add('active-page')

        if (sortType === 'Cheapest') {
            localStorage.setItem('sort', sortType)
            const sorted = [...array].sort((a, b) => a.price - b.price)
            setAds(sorted)
            setSorting(sortType)
        }
        if (sortType === 'Most Expensive') {
            localStorage.setItem('sort', sortType)
            const sorted = [...array].sort((a, b) => b.price - a.price)
            setAds(sorted)
            setSorting(sortType)
        }
        if (sortType === 'Latest') {
            localStorage.setItem('sort', sortType)
            setAds(array)
            setSorting(sortType)
        }
        localStorage.setItem('page', 1)
        setCurrentPage(1)
    }

    const sort = (e, ads) => {
        const sortType = e.target.textContent
        sortingFunc(sortType, ads)
    }

    const paginate = (pageNumber, e) => {
        [...document.getElementsByClassName('active-page')].forEach(x => x.classList.remove('active-page'))
        e.target.classList.add('active-page')
        localStorage.setItem('page', pageNumber)
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        const sortType = localStorage.getItem('sort')
        const visitedPage = localStorage.getItem('page')

        if (ads.length) {
            if (visitedPage) {
                if (sortType) {
                    sortingFunc(sortType, ads)
                }
                setCurrentPage(visitedPage)
                Array.from(document.getElementsByClassName('active-page')).forEach(x => x.classList.remove('active-page'))
                Array.from(document.getElementsByClassName('page-link')).filter(x => x.textContent === visitedPage)[0].classList.add('active-page')
            } else {
                Array.from(document.getElementsByClassName('page-link'))[0].classList.add('active-page')
                setCurrentPage(1)
            }
        }
        // eslint-disable-next-line
    }, [setCurrentPage, ads.length])

    useEffect(() => {
        return () => {
            if (location !== '/profile') {
                localStorage.removeItem("page")
                localStorage.removeItem('sort')
            }
        }
    }, [location])

    return (
        <div className="jumbotron" id="ad-list">
            {ads.length
                ? <div>
                    <h1 >Browse {props.name} Ads</h1>
                    <div className="dropdown">
                        <p >Sorted By {sorting}</p>
                        <button className="btn btn-secondary dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button onClick={(е) => sort(е, props.ads)} className="btn-primary shadow-none">Latest</button>
                            <button onClick={(е) => sort(е, ads)} className="btn-primary shadow-none">Cheapest</button>
                            <button onClick={(е) => sort(е, ads)} className="btn-primary shadow-none">Most Expensive</button>
                        </div>
                    </div>
                    <div className="ad-container">{currentAds.map(x => listAd(x))}</div>
                    <Pagination perPage={perPage} totalAds={ads.length} paginate={paginate} />
                </div>
                : <div className="ad-container">
                    {props.message}
                    {location !== '/profile' || props.message === 'You have not followed any Ads yet'
                        ? <div>
                            {props.message === 'You have not followed any Ads yet'
                                ? <div>
                                    <h3>Browse Categories</h3>
                                    <BrowseCategories />

                                </div>
                                : <div> <Link to="/post-ad" >Be the first to Post</Link></div>
                            }
                        </div>
                        : <div> <Link to="/post-ad" >Post an Ad</Link></div>
                    }
                </div>
            }
        </div >
    )
}
export default AdListing