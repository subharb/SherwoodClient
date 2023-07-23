import { AddPatientComponent } from "./View";

export function AddPatient(props) {
    let { uuidPatient } = useParams();

    if(props.investigations.loading || isLoading){
        return <Loader />
    }
    else if(!props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS)){
        history.push(ROUTE_401);
        return <Loader />
    }
    
    const patient = uuidPatient && props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const patientsInvestigation = props.investigations.currentInvestigation &&  props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    return <AddPatientComponent personalFields={props.investigations.currentInvestigation.personalFields} 
                keyResearcherInvestigation = {props.investigations.currentInvestigation.keyResearcherInvestigation} investigations={props.investigations} patient={patient} patientsInvestigation={patientsInvestigation} {...props} />
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        patients:state.patients
    }
}
export default connect(mapStateToProps, null)(AddPatient)