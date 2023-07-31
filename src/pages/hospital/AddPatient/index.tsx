import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { AddPatientComponent } from './View';
import Loader from '../../../components/Loader';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import { ROUTE_401 } from '../../../routes/urls';
 // Assuming you have a Loader component defined somewhere

interface Props {
    investigations: any; // Replace 'any' with the appropriate type
    patients: any; // Replace 'any' with the appropriate type
    isLoading: boolean; // Assuming you have 'isLoading' defined somewhere
}

export function AddPatient(props: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { uuidPatient } = useParams();
    const history = useHistory();

    async function callbackSavePatient(patientData) {

        try {
            setIsLoading(true);

            if (props.patient) {
                await dispatch(updatePatientAction(props.investigations.currentInvestigation, props.patient.uuid, patientData));

            }
            else {
                await dispatch(savePatientAction(props.investigations.currentInvestigation, patientData));

            }
            setIsLoading(false);
            setConfirmPatient(null);
        }
        catch (error) {
            setIsLoading(true);
            setShowSnackbar({ show: true, severity: "error", message: "hospital.patient.error" });
        }

    }

    if (isLoading || props.investigations.loading || props.isLoading) {
        return <Loader />;
    } else if (
        !props.investigations.currentInvestigation.permissions.includes(
            PERMISSION.PERSONAL_ACCESS
        )
    ) {
        history.push(ROUTE_401);
        return <Loader />;
    }

    const patient =
        uuidPatient &&
            props.investigations.data &&
            props.patients.data
            ? props.patients.data[props.investigations.currentInvestigation.uuid].find(
                (pat: any) => pat.uuid === uuidPatient
            )
            : null;

    const patientsInvestigation =
        props.investigations.currentInvestigation && props.patients.data
            ? props.patients.data[props.investigations.currentInvestigation.uuid]
            : [];

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
            patientsInvestigation={patientsInvestigation}
            callbackSavePatient={(patientData: any) => {
                callbackSavePatient(patientData)
            }}
                callbackGoToPatient = {(uuidPatient) => history.push(`/patient/${uuidPatient}`)
            }
      {...props}
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
