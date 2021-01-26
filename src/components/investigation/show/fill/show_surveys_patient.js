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
    const [action, setAction] = useState(0);
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [indexSection, setIndexSection] = useState(null);

    function viewSurvey(index){
        setAction(1);
        setIndexSurvey(index);
    }
    function addRecordSurvey(index){
        setAction(2);
        setIndexSurvey(index)
    }
    function callBackSection(values){
        console.log(callBackSection);
        let dataObj = {};
        dataObj[props.surveys[indexSurvey].sections[indexSection]._id] = values;
        props.saveRecord(dataObj, props.surveys[indexSurvey]._id);
        setAction(2);
    }
    function sectionSelected(indexSection){
        setIndexSection(indexSection);
        setAction(3);
    }
    // function renderTitle(){
    //     switch(action){
    //         case 0:
    //             return(
    //                 <div className="row">    
    //                     <Translate id="investigation.fill.survey.title"/>
    //                 </div>
    //             )
    //         case 1:
    //         case 2:
    //             return(
    //                 <div className="row">    
    //                     {props.surveys[indexSurvey].name}
    //                 </div>
    //             )
    //         case 3:
    //             return(
    //                 <div className="row">    
    //                     {props.surveys[indexSurvey].sections[indexSection].name}
    //                 </div>
    //             )
    //         default:
    //             return(
    //                 <div className="row">    
    //                     <Translate id="investigation.fill.survey.title"/>
    //                 </div>
    //             )
    //     }
        
    // }
    function renderHeader(){
        if(indexSurvey !== null){
            let stages = [ props.translate("investigation.fill.survey.title")];
            if(indexSurvey !== null){
                stages.push(props.surveys[indexSurvey].name);
                stages.push( props.translate("investigation.create.edc.data_collections.sections"));
            }
            if(indexSection !== null){
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
        switch(action){
            //Muestra los surveys
            case 0:
                //Si estamos en modo editar o visualizar
                if(props.mode === "add"){
                    component = (
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.title" />}  rows={props.surveys.map(survey => {return {name : survey.name}})}
                                headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                actions={{"add" : (indexSurvey) => addRecordSurvey(indexSurvey)}}
                            />
                        </div>)
                }
                else{
                    component = (
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.title" />}  rows={props.surveys.map(survey => {return {name : survey.name}})}
                                headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                actions={{"view" : (indexSurvey) => viewSurvey(indexSurvey)}}
                            />
                        </div>)
                }
                break;
            //Ver Survey
            case 1: 
                component = (<ShowPatientRecords mode="elements" 
                                patient={props.patient} survey={props.surveys[indexSurvey]} 
                                uuidInvestigation={props.uuidInvestigation} />)
                break;
            //Editar Survey
            case 2:
                //Muestro para elegir la sección
                return(
                    <div className="row">
                        <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.sections" />} rows={props.surveys[indexSurvey].sections.map(section => {return {name : section.name}})}
                                headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                actions={{"view" : (indexSurvey) => sectionSelected(indexSurvey)}}
                            />
                    </div>
                );
                break;
            //Rellenar Sección seleccionada
            case 3:
                return <Form fields={props.surveys[indexSurvey].sections[indexSection].fields} 
                    callBackForm = {(values) => callBackSection(values)}/>
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