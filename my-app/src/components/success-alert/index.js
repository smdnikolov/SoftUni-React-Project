import React from 'react'

const SuccessAlert = (props) => {
    return (
        <div className="alert alert-success" role="alert">{props.message}</div>
    )
}
export default SuccessAlert