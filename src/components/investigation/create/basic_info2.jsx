import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FIELDS_BASIC_INFO } from '../../../utils/index.jsx';
import { Grid, Card, CardContent } from '@mui/material';

export default class BasicInfo2 extends Component {
    
    render() {
        let parsedData = {...this.props.initialData};
        if(parsedData.hasOwnProperty('institution')){
            parsedData.institution = parsedData.institution.name;
        }
        
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