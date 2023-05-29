import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Translate } from 'react-localize-redux';

export default class Preview extends Component {
    renderConsents(){
        if(!_.isEmpty(this.props.consents)){
            return(
                <table key="table-fields" className="striped">
                    <thead>
                    <tr>
                        <th ><Translate id="investigation.create.consent.reason" ></Translate></th>
                        <th ><Translate id="investigation.create.consent.required" /></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(this.props.consents).map(key => {
                            const field = this.props.consents[key];
                            return(
                                <tr key={key}>
                                    <td>{field.value}</td>
                                    <td>{field.required ? "yes" : "no"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>);
        }
        else{
            return null;
        }
    }
    render() {
        console.log("Preview", this.props.personalFields);
        return (
            <div>
                <h1>{this.props.titleInvestigation}</h1>
                {this.renderConsents()}
            </div>
        )
    }
}
Preview.propTypes = {
    callBackData: PropTypes.func, 
    consents : PropTypes.object,
    personalFields: PropTypes.array,
    titleInvestigation:PropTypes.string,
    
}; 
