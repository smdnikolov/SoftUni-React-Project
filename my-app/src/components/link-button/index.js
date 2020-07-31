import React, { Component } from 'react'


class Footer extends Component {
    render() {
        return (
            <a className="btn btn-primary" href={this.props.link} role="button">{this.props.name}</a>

        )
    }
}

export default Footer