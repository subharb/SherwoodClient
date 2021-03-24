import React, {useState} from 'react'
import Breadcrumb from '../../../general/breadcrumb';
import { EnhancedTable } from '../../../general/EnhancedTable';
import { Translate, withLocalize } from 'react-localize-redux';
import ShowRecordsSection from './show_records_section';
import ShowPatientRecords from './show_patient_records';
import PropTypes from 'prop-types';
import { fetchRecordsPatientFromSurvey } from '../../../../services/sherwoodService';
import { filterRecordsFromSubmissions } from '../../../../utils';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonBack } from '../../../general/mini_components';
import Form from '../../../general/form';
import { Grid, Typography } from '@material-ui/core';

/**
 * Componente que muestra los surveys de una investigación. Con botones para añadir información o visualizar
 */

function ShowSurveys(props) {
    
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [indexSection, setIndexSection] = useState(null);
    const [submissionsSurvey, setSubmissionsSurvey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    
    function viewSurvey(index){
        const submissionsSurvey = props.submissions.find(sur=>sur.uuid === props.surveys[index].uuid); 
        if(submissionsSurvey){
            props.updateLevel(1);
            setIndexSurvey(index);
        }
        else{
            setShowSnackbar(true);
        }
        
    }
    async function addRecordSurvey(index){
        props.updateLevel(1);
        setIndexSurvey(index);
        setLoading(true);
        setLoading(false);
    }
    function callBackSection(values){
        console.log(callBackSection);
        let dataObj = {};
        const dataFields = [];
        Object.keys(values).map(key =>{
            let tempObj = {};
            tempObj["id_field"] = parseInt(key);
            tempObj["value"] = values[key];
            dataFields.push(tempObj);
        })
        dataObj[props.surveys[indexSurvey].sections[indexSection].uuid] = dataFields;

        props.saveRecord(dataObj, props.surveys[indexSurvey].uuid);
    }
    function sectionSelected(indexSection){
        if(!props.surveys[indexSurvey].sections[indexSection].repeats){
            const submissionSurvey = props.submissions.find(sur=>sur.uuid ===  props.surveys[indexSurvey].uuid);
            const filteredSubmissions = filterRecordsFromSubmissions(submissionSurvey, props.surveys[indexSurvey].sections[indexSection].uuid);
            if(filteredSubmissions.length > 0){
                console.log("Sección ya relleneada");
                setShowSnackbar(true);
                return;
            }
        }
        setIndexSection(indexSection);
        props.updateLevel(2);
    }
    function handleCloseSnackbar(){
        setShowSnackbar(false);
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
                    const submissionsSurvey = props.submissions.find(sur=>sur.uuid === props.surveys[indexSurvey].uuid);
                    return(
                        <ShowPatientRecords mode="elements" 
                            patient={props.patient} survey={props.surveys[indexSurvey]} submissions={submissionsSurvey.submissions}
                            uuidInvestigation={props.uuidInvestigation} />
                    )
                }
                else{
                    return(
                        <div className="row">
                            <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.sections" />} 
                                rows={props.surveys[indexSurvey].sections.map(section => {return {name : section.name}})}
                                    headCells={[{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }]}
                                    actions={{"add" : (indexSurvey) => sectionSelected(indexSurvey)}}
                                />
                        </div>
                    );
                }
                break;
            case 2:
                if(props.mode === "add"){
                    const arrayFields = props.surveys[indexSurvey].sections[indexSection].fields.map(field => {
                        field["name"] = field.id;
                        return field;
                    });
                    return <Form fields={arrayFields} 
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
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={<Translate id="investigation.fill.section.already_filled" />}
                action={
                <React.Fragment>
                    
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="textPrimary">
                    <Translate id="investigation.fill.survey.patient_name"/>: 
                    {
                        props.patient.name+" "+props.patient.surnames
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
    uuidInvestigation:PropTypes.string,
    surveys: PropTypes.object,
    submissions: PropTypes.array,
    mode : PropTypes.string
};

export default withLocalize(ShowSurveys)