import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper teal lighten-1">
                    <Link to="/" className="left brand-logo">Sherwood</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/researcher/login">Login Researcher</Link></li>
                        <li><Link to="/patient/login">Login Patient</Link></li>
                        <li><Link to="/researcher/register">Register Researcher</Link></li>
                        <li><Link to="/patient/register">Register Patient</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
