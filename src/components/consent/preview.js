import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Translate } from 'react-localize-redux';

export default class Preview extends Component {
    renderOtherConsents(){
        const nonPersonalConsents = {};
        Object.keys(this.props.consents).forEach(key => {
            const consent = this.props.consents[key];
            if(!consent.is_personal_data){
                nonPersonalConsents[key] = consent;
            }
        });
        if(!_.isEmpty(nonPersonalConsents)){
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
                        Object.keys(nonPersonalConsents).map(key => {
                            const field = nonPersonalConsents[key];
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
    renderPersonalDataConsents(){
        if(this.props.personalFields.length > 0){
            const personalConsents = this.props.personalFields.map(field => {
                console.log("personalConsents", field);
                return (
                    {personalData : field.name.value, reason: this.props.consents[field.name.value].value}
                )
            })
            return( 
                <div>
                    <Translate id="consent.personal_data_header" ></Translate>:
                    <div>
                        <table key="table-fields" className="striped">
                            <thead>
                            <tr>
                                <th ><Translate id="consent.personal_data" ></Translate></th>
                                <th ><Translate id="investigation.create.consent.reason" /></th>
                                <th ><Translate id="investigation.create.consent.required" /></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                personalConsents.map(field => {
                                    return(
                                        <tr key={field.personalData}>
                                            <td>{field.personalData}</td>
                                            <td>{field.reason}</td>
                                            <td>{field.required ? "yes" : "no"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>);
        }
        else{
            return
        }
    }
    render() {
        console.log("Preview", this.props.personalFields);
        return (
            <div>
                <h1>{this.props.titleInvestigation}</h1>
                {this.renderPersonalDataConsents()}
                {this.renderOtherConsents()}
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
