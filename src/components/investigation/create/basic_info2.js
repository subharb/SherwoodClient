import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FIELDS_BASIC_INFO } from '../../../utils';
import { Grid, Card, CardContent } from '@material-ui/core';

export default class BasicInfo2 extends Component {
    
    render() {
        let parsedData = {...this.props.initialData};
        parsedData.institution = parsedData.institution.name;
        return (
                <Card>
                    <CardContent>
                        <Form initialData={parsedData} 
                            fields={FIELDS_BASIC_INFO} submitText = "investigation.create.continue"
                            cancelText = "investigation.create.back"
                            callBackForm={(values) => this.props.callBackData(values)} />                
                    </CardContent>
                </Card>
        )
    }
}

BasicInfo2.propTypes = {
    callBackBasicInfo : PropTypes.func.isRequired

}