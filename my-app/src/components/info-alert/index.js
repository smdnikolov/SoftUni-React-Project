import React from 'react'

const InfoAlert = (props) => {
    return (
        <div className="alert alert-primary" role="alert">{props.message}</div>
    )
}
export default InfoAlert