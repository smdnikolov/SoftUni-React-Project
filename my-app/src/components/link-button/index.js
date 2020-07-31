import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class ButtonLink extends Component {
    render() {
        return (
            <Link className="btn btn-primary" to={this.props.link} role="button">{this.props.name}</Link>
        )
    }
}

export default ButtonLink