import React from 'react'
import { Link } from 'react-router-dom'


const ButtonLink = (props) => {

    return (
        <Link to={props.link} className="btn shadow-none" role="button">{props.name}</Link>
    )

}

export default ButtonLink