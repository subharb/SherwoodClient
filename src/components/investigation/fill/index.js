import React, { useState } from 'react';
import PersonalDataForm from './personal_data';
import SurveyForm from './survey_form';
import { ButtonAdd } from '../../general/mini_components';

export default function AddDataInvestigation(props) {
    const [showForm, setshowForm] = useState(0);
    function toogleForm(){
        setshowForm(!showForm);
    }
    function renderRecords(){
        if(props.initialData.survey.records.length === 0){
            return "You dont have any records yet"
        }
        else{
            return props.initialData.survey.records.map(record => {
                return record;
            });
        }
        
    }
    function renderForm(){
        switch(showForm){
            case 0:
                return null;
            case 1:
                return <PersonalDataForm />
            case 2: 
                return <SurveyForm />
            default:
                return null;
        }
    }
    return (
        <div className="container">
            <div className="row">
                <h5>{props.initialData.name}</h5>
            </div>
            <div className="row">
                Add new patient<ButtonAdd onClick={toogleForm} />
            </div>
            <div className="row">
                Add new record<ButtonAdd onClick={toogleForm} />
            </div>
            {
                renderForm()
            }
            {
                renderRecords()
            }
        </div>
    )
}
