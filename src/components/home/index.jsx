import React, { Component } from 'react'
import Header from '../general/header';

export default class Home extends Component {
    componentDidMount(){
        if(!localStorage.getItem("jwt")){
            this.props.history.push("/researcher/login");
        }
        else{
            this.props.history.push("/dashboard");
        }
        
    }
    render() {
        return (
            <div>
                <Header />
                    Welcome to Sherwood!
            </div>
        )
    }
}
