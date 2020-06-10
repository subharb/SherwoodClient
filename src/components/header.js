import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper teal lighten-1">
                    <a href="#" className="left brand-logo">Sherwood</a>
                    
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
