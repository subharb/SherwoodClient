import React, { useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { AddPatientComponent } from './View';
import Loader from '../../../components/Loader';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import { ROUTE_401 } from '../../../routes/urls';
import { updatePatientAction, savePatientAction } from '../../../redux/actions/patientsActions';
import { usePrevious } from '../../../hooks';
 // Assuming you have a Loader component defined somewhere

interface Props {
    investigations: any; // Replace 'any' with the appropriate type
    patients: any; // Replace 'any' with the appropriate type
    isLoading: boolean; // Assuming you have 'isLoading' defined somewhere
}

export function AddPatient(props: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentInvestigation, setCurrentInvestigation] = useState<any>({});
    const [patientsInvestigation, setPatientsInvestigation] = useState([]);
    const [addedPatient, setAddedPatient] = useState(false);
    const { uuidPatient } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const patient = useMemo(() => {
        return uuidPatient &&
            props.investigations.data &&
            props.patients.data
            ? props.patients.data[props.investigations.currentInvestigation.uuid].find(
                (pat: any) => pat.uuid === uuidPatient
            )
            : null;
    }, [uuidPatient,props.investigations.data, props.patients.data] );
        
    useEffect(() => {
        setPatientsInvestigation(currentInvestigation && props.patients.data
            ? props.patients.data[currentInvestigation.uuid]
            : []);
    }, [currentInvestigation, props.patients.data])

    useEffect(() => {
        setCurrentInvestigation(props.investigations.currentInvestigation)
    }, [props.investigations.data])

    async function callbackSavePatient(patientData) {

        try {
            setIsLoading(true);

            if (patient) {
                await dispatch(updatePatientAction(props.investigations.currentInvestigation, patient.uuid, patientData));

            }
            else {
                await dispatch(savePatientAction(props.investigations.currentInvestigation, patientData));

            }
            setAddedPatient(true);
            setIsLoading(false);
            
        }
        catch (error) {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if(addedPatient){
            setTimeout(() => {
                setAddedPatient(false);
            }, 3000);
            
        }
    }, [addedPatient])

    if (isLoading || props.investigations.loading || props.isLoading) {
        return <Loader />;
    } 
    else if (
        !props.investigations.currentInvestigation.permissions.includes(
            PERMISSION.PERSONAL_ACCESS
        )
    ) {
        history.push(ROUTE_401);
        return <Loader />;
    }

    return (
        <AddPatientComponent
            personalFields={props.investigations.currentInvestigation.personalFields}
            insurances={props.investigations.currentInvestigation.insurances}
            keyResearcherInvestigation={
                props.investigations.currentInvestigation.keyResearcherInvestigation
            }
            uuidPatient={uuidPatient}
            investigations={props.investigations}
            patient={patient}
            addedPatient = {addedPatient}
            error={props.patients.error}
            patientsInvestigation={patientsInvestigation}
            callbackSavePatient={(patientData: any) => {
                callbackSavePatient(patientData)
            }}
                callbackGoToPatient = {(uuidPatient) => history.push(`/patient/${uuidPatient}`)
            }
        />
    );
}

const mapStateToProps = (state: any) => {
    return {
        investigations: state.investigations, // Replace 'any' with the appropriate type for state.investigations
        patients: state.patients, // Replace 'any' with the appropriate type for state.patients
    };
};

export default connect(mapStateToProps, null)(AddPatient);
