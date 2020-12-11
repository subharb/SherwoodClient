import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import pathLogo from '../../logo-sherwood.png';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderContainer = styled.div`
    background:${props => props.theme.primary.background};
    color:${props => props.theme.primary.color};
`;

const LinkHeader = styled(Link)`
    color:${props => props.theme.primary.color};
`;

const ListLinks = styled.ul`
    display:flex;
`

const ListItem = styled.li`
    list-style-type: none;
    margin-left: 1rem;
`;
const LogoContainer = styled.div`
    display:flex!important;
`;
const LogoHolder = styled.div`
    padding:1rem;
`;

export default class Header extends Component {
    render(){
        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <Link class="navbar-item" to="/">
                        <img src={pathLogo} alt="Sherwood Science" height="60" />
                        Sherwood Science
                    </Link>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                 

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Patients
                        </a>

                        <div class="navbar-dropdown">
                            <Link class="navbar-item" to="/patient/register">
                                Register
                            </Link>
                            <Link class="navbar-item" to="/patient/login">
                                Login
                            </Link>
                        </div>
                    </div>
                    </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <Link class="button is-primary" to="/researcher/register">
                            <strong>Sign up</strong>
                        </Link>
                        <Link class="button is-light" to="/researcher/login">
                            Log in
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </nav>
        )
    }
    /* render() {
        return (
            <nav>
                <HeaderContainer className="">
                    <LogoContainer className="">
                        <LogoHolder>
                            <img  className="left " src={pathLogo} alt="Sherwood" height="40"/>
                        </LogoHolder>
                        <LinkHeader to="/" >Sherwood</LinkHeader>
                    </LogoContainer>
                    {!this.props.isLoggedIn && 
                    <ListLinks id="nav-mobile" className="">
                        <ListItem><LinkHeader to="/researcher/login">Login Researcher</LinkHeader></ListItem>
                        <ListItem><LinkHeader to="/patient/login">Login Patient</LinkHeader></ListItem>
                        <ListItem><LinkHeader to="/researcher/register">Register Researcher</LinkHeader></ListItem>
                    </ListLinks>
                    }
                </HeaderContainer>
            </nav>
        )
    } */
}

Header.propTypes = {
    isLoggedIn : PropTypes.bool
}