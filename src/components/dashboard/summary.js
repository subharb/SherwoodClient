import React, { Component } from 'react'
import { Translate } from 'react-localize-redux'

export default class Summary extends Component {
    render() {
        return (
            <div>
                <h5><Translate id="dashboard.summary.title" /></h5>
            </div>
        )
    }
}
