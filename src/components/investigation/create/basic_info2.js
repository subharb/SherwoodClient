import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FIELDS_BASIC_INFO } from '../../../utils';

export default class BasicInfo2 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3><Translate id="investigation.create.edc.title" /></h3>
                </div>
                    <Form initialData={this.props.initialData} 
                        fields={FIELDS_BASIC_INFO} submitText = "investigation.create.continue"
                        cancelText = "investigation.create.back"
                        callBackForm={(values) => this.props.callBackData(values)} />
            </div>
        )
    }
}

BasicInfo2.propTypes = {
    callBackBasicInfo : PropTypes.func.isRequired

}