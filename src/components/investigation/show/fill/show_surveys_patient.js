import React, {useState} from 'react'
import Table from '../../../general/table';
import { Translate } from 'react-localize-redux';
import ShowRecordsSection from './show_records_section';
import ShowPatientRecords from './show_patient_records';
import PropTypes from 'prop-types';
import { findSubmissionsFromSection } from '../../../../utils';
import { ButtonBack } from '../../../general/mini_components';
import PatientRecords from './show_patient_records';
import Form from '../../../general/form';

/**
 * 
 * Componente que muestra los surveys de una investigación. Con botones para añadir información o visualizar
 */
export default function ShowSurveys(props) {
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
        return(
            <h6>Data Collections {indexSurvey !== null ? "> "+props.surveys[indexSurvey].name+" > Sections" : ""}
                {indexSection !== null ? "> "+props.surveys[indexSurvey].sections[indexSection].name : ""} </h6>
        )
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
                            <Table header={["name"]} values={props.surveys.map(survey => {return [survey.name]})}
                                addCallBack={(indexSurvey) => addRecordSurvey(indexSurvey)} 
                             />
                        </div>)
                }
                else{
                    component = (
                        <div className="row">
                            <Table header={["name"]} values={props.surveys.map(survey => {return [survey.name]})}
                                viewCallBack={(indexSurvey) => viewSurvey(indexSurvey)} />
                        </div>)
                }
                break;
            //Ver Survey
            case 1: 
                component = (<ShowPatientRecords mode="elements" 
                                patient={props.patient} survey={props.surveys[indexSurvey]} 
                                uuidInvestigation={props.uuidInvestigation} />)
                // component = (
                //     Object.values(props.surveys[indexSurvey].sections).map(section => {
                //         const submissionsSection = findSubmissionsFromSection(props.records, section._id);
                //         return(
                //             <ShowRecordsSection submissions={submissionsSection} section={section} />
                //         )
                //     })
                // )
                break;
            //Editar Survey
            case 2:
                //Muestro para elegir la sección
                return(
                    <div className="row">
                        <Table header={["name"]} values={props.surveys[indexSurvey].sections.map(section => {return [section.name]})}
                            addCallBack={(indexSection) => sectionSelected(indexSection)} 
                            />
                    </div>
                );
                // return <PatientRecords initialData={ props.investigation.surveys } 
                //             uuidInvestigation={props.investigation.uuid}  patient={patientsData[patientIndex]}
                //             callBackForm={(values) => saveRecord(values) }/>
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
        <div className="container">
             <div className="row">
                <Translate id="investigation.fill.survey.patient_name"/>:
            
                {
                    props.patient.personalData.name+" "+props.patient.personalData.surname
                }
            </div>
            <div className="row">
                {
                    renderHeader()
                }
            </div>
                {
                    renderCore()
                }
        </div>
    )
    
}
ShowSurveys.propTypes = {
    surveys: PropTypes.object,
    submissions: PropTypes.array,
    mode : PropTypes.string
};