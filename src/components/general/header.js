import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import pathLogo from '../../logo-sherwood.png';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    background:${props => props.theme.headerBackground}
`;

const LogoContainer = styled.div`
    display:flex!important;
`;
const LogoHolder = styled.div`
    padding:1rem;
`;

export default class Header extends Component {
    render() {
        return (
            <nav>
                <HeaderContainer className="nav-wrapper">
                    <LogoContainer className="left brand-logo">
                        <LogoHolder>
                            <img  className="left " src={pathLogo} alt="Sherwood" height="40"/>
                        </LogoHolder>
                        <Link to="/" >Sherwood</Link>
                    </LogoContainer>
                    {!localStorage.getItem("jwt") && 
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/researcher/login">Login Researcher</Link></li>
                        <li><Link to="/patient/login">Login Patient</Link></li>
                        <li><Link to="/researcher/register">Register Researcher</Link></li>
                    </ul>
                    }
                    
                    
                </HeaderContainer>
            </nav>
        )
    }
}
