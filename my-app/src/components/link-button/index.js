import React from 'react'
import { Link } from 'react-router-dom'


function ButtonLink(props) {

    return (
        // eslint-disable-next-line
        <Link to={props.link} className="btn btn-primary" role="button">{props.name}</Link>

    )

}

export default ButtonLink