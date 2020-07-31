import React, { Component } from 'react'



class Login extends Component {
    render() {
        return (
            <div className="container search">
            <div className="row">
                <div className="col">
                    <div className="jumbotron text-center">
                        <h1>Welcome to the Online Market</h1>
                        <p>Browse the Categories to find what you need
                        </p>
                        <ul className="cat">
                            <li>
                                <a href="/category.html">
                                    <img src="/icons/homes.png" alt="" width="100px"/>
                                    <p>Homes</p>
                                </a>
    
                            </li>
                            <li>
                                <a href="">
                                    <img src="/icons/cars.png" alt="" width="100px"/>
                                    <p>Cars</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/icons/clothes.png" alt="" width="100px"/>
                                    <p>Fashion</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/icons/tech.png" alt="" width="100px"/>
                                    <p>Electronics</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/icons/misc.png" alt="" width="100px"/>
                                    <p>Misc</p>
                                </a>
                            </li>
                        </ul>
                        <h1>Or ...</h1>
                        <form >
                            <input type="text" id="myInput" placeholder="Search for ads..."/>
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
}

export default Login