import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FIELDS_BASIC_INFO } from '../../../utils';
import { Grid } from '@material-ui/core';

export default class BasicInfo2 extends Component {
    render() {
        return (
            <Grid container>
                <Grid lg={6}>
                <Form initialData={this.props.initialData} 
                    fields={FIELDS_BASIC_INFO} submitText = "investigation.create.continue"
                    cancelText = "investigation.create.back"
                    callBackForm={(values) => this.props.callBackData(values)} />
                </Grid>
            </Grid>
                
        )
    }
}

BasicInfo2.propTypes = {
    callBackBasicInfo : PropTypes.func.isRequired

}