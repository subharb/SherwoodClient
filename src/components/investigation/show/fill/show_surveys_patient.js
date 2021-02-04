import React, {useState} from 'react'
import Breadcrumb from '../../../general/breadcrumb';
import { EnhancedTable } from '../../../general/EnhancedTable';
import { Translate, withLocalize } from 'react-localize-redux';
import ShowRecordsSection from './show_records_section';
import ShowPatientRecords from './show_patient_records';
import PropTypes from 'prop-types';
import { findSubmissionsFromSection } from '../../../../utils';
import { ButtonBack } from '../../../general/mini_components';
import PatientRecords from './show_patient_records';
import Form from '../../../general/form';
import { Grid, Typography } from '@material-ui/core';

/**
 * Componente que muestra los surveys de una investigación. Con botones para añadir información o visualizar
 */

function ShowSurveys(props) {
    
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [indexSection, setIndexSection] = useState(null);

    function viewSurvey(index){
        props.updateLevel(1);
        setIndexSurvey(index);
    }
    function addRecordSurvey(index){
        props.updateLevel(1);
        setIndexSurvey(index)
    }
    function callBackSection(values){
        console.log(callBackSection);
        let dataObj = {};
        dataObj[props.surveys[indexSurvey].sections[indexSection]._id] = values;
        props.saveRecord(dataObj, props.surveys[indexSurvey]._id);
        props.updateLevel(1);
    }
    function sectionSelected(indexSection){
        setIndexSection(indexSection);
        props.updateLevel(2);
    }
    
    function renderHeader(){
        if(indexSurvey !== null){
            let stages = [ props.translate("investigation.fill.survey.title")];
            if(props.level > 0){
                stages.push(props.surveys[indexSurvey].name);
                stages.push( props.translate("investigation.create.edc.data_collections.sections"));
            }
            if(props.level > 1){
                stages.push(props.surveys[indexSurvey].sections[indexSection].name);
            }
            return(
                <Typography variant="body2" color="textPrimary">
                    <Breadcrumb callBack={{}} selected={stages.length-1} stages={stages} />  
                </Typography>
            )
        }
        else{
            return null;
        }
    }
    function renderCore(){
    
        let component = null;
        switch(props.level){
            //Muestra los surveys
            case 0:
                //Si estamos en modo editar o visualizar
                if(props.mode === "add"){
                    return (
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.title" />}  
                                rows={props.surveys.map(survey => {return {name : survey.name}})}
                                headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                actions={{"add" : (indexSurvey) => addRecordSurvey(indexSurvey)}}
                            />
                        </div>)
                }
                else{
                    return (
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.title" />}  rows={props.surveys.map(survey => {return {name : survey.name}})}
                                headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                actions={{"view" : (indexSurvey) => viewSurvey(indexSurvey)}}
                            />
                        </div>)
                }
            //     //Mustra los Records pacientes
            // case 1: 
            // component = (<ShowPatientRecords mode="elements" 
            //                 patient={props.patient} survey={props.surveys[indexSurvey]} 
            //                 uuidInvestigation={props.uuidInvestigation} />)
            // break;
            //Muestra las secciones
            case 1:
                if(props.mode === "view"){
                    //Muestro para elegir la sección
                    return(
                        <ShowPatientRecords mode="elements" 
                            patient={props.patient} survey={props.surveys[indexSurvey]} 
                            uuidInvestigation={props.uuidInvestigation} />
                    )
                }
                else{
                    return(
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.sections" />} rows={props.surveys[indexSurvey].sections.map(section => {return {name : section.name}})}
                                    headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                    actions={{"add" : (indexSurvey) => sectionSelected(indexSurvey)}}
                                />
                        </div>
                    );
                }
                break;
            case 2:
                if(props.mode === "add"){
                    return <Form fields={props.surveys[indexSurvey].sections[indexSection].fields} 
                                callBackForm = {(values) => callBackSection(values)}/>
                }
            
            default:
                return null;
        }

        return([
            component
        ])
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="textPrimary">
                    <Translate id="investigation.fill.survey.patient_name"/>: 
                    {
                        props.patient.name+" "+props.patient.surname
                    }
                </Typography>  
            </Grid>
            <Grid item xs={12}>
                {
                    renderHeader()
                }
            </Grid>
            <Grid item xs={12}>
                {
                    renderCore()
                }
            </Grid>
        </Grid>
    )
    
}
ShowSurveys.propTypes = {
    surveys: PropTypes.object,
    submissions: PropTypes.array,
    mode : PropTypes.string
};

export default withLocalize(ShowSurveys)