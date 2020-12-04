import React from 'react'
import {Translate} from 'react-localize-redux';
import { PERSONAL_DATA_FIELDS } from '../../../utils';
import Form from '../../general/form';

export default function PersonalDataForm(props) {
    let form = {}
    for(let i = 0; i < props.fields.length; i++){
        const value = props.fields[i];
        form[value] = {...PERSONAL_DATA_FIELDS[value]};
    }
    function savePersonalData(data){
        console.log(data);
    }
    return (
        <div className="container">
            <div className="row">
                <h5><Translate id="investigation.fill.personal_data.title" /></h5>
            </div>
            <div className="row">
                <span><Translate id="investigation.fill.personal_data.description" /></span>
            </div>
            <Form fields={form} callBackForm={(data) =>props.callBackForm(data)}/>
        </div>
    )
}
