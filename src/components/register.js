import React, { Component } from 'react'
import Header from './general/header';
import Breadcrumb from './general/breadcrumb';

export default class Register extends Component {
    crumbSelected(index){
        console.log(`Index selected ${index}`);
    }
    render() {
        return ([
            <Header key="header"/>,
            <div>
                <Breadcrumb callBack={this.crumbSelected} selected={0} stages={["Personal Info", "Contact Info", "Key Generation"]} />    
            </div>
        ]
            
        )
    }
}
