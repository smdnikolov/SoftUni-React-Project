import React, { useContext, useEffect } from 'react'
import BrowseCategories from '../../components/browse-categories'
import { ToastContext } from '../../Store'
import ErrorAlert from '../../components/error-alert'
import InfoAlert from '../../components/info-alert'


function Home() {

    const [toast, setToast] = useContext(ToastContext)

    useEffect(() => {
        if (toast === 'noAuth' || toast === 'notFound' || toast === 'logged') {
            setTimeout(() => {
                setToast('')
            }, 2000)
        }
    }, [toast, setToast])

    return (
        <div className="container search">
            {toast === 'noAuth'
                ? <ErrorAlert message="You have no permission to edit this Ad" />
                : null
            }
            {toast === 'notFound'
                ? <ErrorAlert message="There is no such Ad or it has already been closed" />
                : null
            }
            {toast === 'logged'
                ? <InfoAlert message="You are already logged in" />
                : null
            }
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