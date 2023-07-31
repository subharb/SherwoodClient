import React, { useMemo, useState } from 'react';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { PersonAddSharp, EditOutlined } from '@mui/icons-material';
import { Button, Grid, Paper, Snackbar, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { useSnackBarState, useUpdateEffect } from '../../../hooks';
import PersonalDataForm from '../../../components/investigation/show/single/personal_data';
import { BoxBckgr, GridContainer } from '../../../components/general/mini_components';
import { areSameDates } from '../../../utils/index.jsx';
import Modal from '../../../components/general/modal';

interface Props {
  investigations: any; // Replace 'any' with the appropriate type
  patient: any; // Replace 'any' with the appropriate type
  patientsInvestigation: any; // Replace 'any' with the appropriate type
  personalFields: any; // Replace 'any' with the appropriate type
  keyResearcherInvestigation: any; // Replace 'any' with the appropriate type
  insurances:any,
  callbackGotoPatient: (uuidPatient:string) => void;
}

function AddPatientComponent(props: Props) {
  console.log('AddPatientComponent', props);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useSnackBarState();
  const [confirmPatient, setConfirmPatient] = useState<any | null>(null);
  const [lastPatient, setLastPatient] = useState<any | null>(null);
  const currentFields = useMemo(() => {
    console.log("Use memo");
    const fields = [...props.personalFields];
    if (props.insurances) {
      fields.push({
        name: 'insurance',
        label: "hospital.patient.insurances.select",
        type: 'select',
        options: props.insurances.map((insurance: any) => {
          return { value: insurance.id, label: insurance.name };
        }),
      });
    }
    return fields;
  }, [props.personalFields]);

  function handleClose() {
    setShowSnackbar({ show: false });
  }

  useUpdateEffect(() => {
    if (!props.patients.loading) {
      let messageId = '';
      let severity = 'success';
      if (props.patient) {
        messageId = 'hospital.patient.updated-patient';
      } else {
        messageId = 'hospital.patient.new-patient';
      }
      if (props.patients.error === 2) {
        messageId += '-offline';
        severity = 'warning';
      } else if (props.patients.error) {
        messageId = 'hospital.patient.error';
        severity = 'error';
      }
      setShowSnackbar({ show: true, severity: severity, message: messageId });
      setLastPatient(
        props.patientsInvestigation[props.patientsInvestigation.length - 1]
      );
    }
  }, [props.patients.loading]);

  function goToPatient(){
    const uuidPatient = props.patient ? props.patient.uuid : lastPatient.uuid;
    props.callbackGotoPatient(uuidPatient)
}
async function callBackSaveUpdate(patientData:any, rawPatientData:any){
    if(!props.patient){
        //Si es guardar, verifica si este paciente ya estaba
        const existingPatient = props.patients.data[props.investigations.currentInvestigation.uuid].find((pat) => {
            if(rawPatientData.hasOwnProperty("health_id") && pat.personalData["health_id"] === rawPatientData["health_id"]){
                return true;
            }
            const rawName = rawPatientData["name"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const rawSurName = rawPatientData["surnames"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const patName = pat.personalData["name"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const patSurname = pat.personalData["surnames"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(`${rawName} === ${patName} =>${rawName === patName}`);
            console.log(`${rawSurName} === ${patSurname} =>${rawSurName === patSurname}`);
            console.log(`${rawPatientData["birthdate"]} === ${pat.personalData["birthdate"]} =>${areSameDates(rawPatientData["birthdate"], pat.personalData["birthdate"])}`);
            
            if(rawName === patName && 
                rawSurName === patSurname &&
                areSameDates(rawPatientData["birthdate"], pat.personalData["birthdate"]))
            return true;
        });
        if(existingPatient){
            //showModal    
            setConfirmPatient({
                rawData : rawPatientData,
                encryptedData: patientData
            });
            return;
        }
    }
    saveUpdatePatient(patientData)
}


return (
    <BoxBckgr color="text.primary">
        <Modal key="modal" open={confirmPatient} 
            title={<Translate id="pages.hospital.confirm-patient.title" />}
            closeModal={() => setConfirmPatient(null)}
            confirmAction={() => saveUpdatePatient(confirmPatient.encryptedData)}>
                {
                    confirmPatient &&
                    [<Translate id="pages.hospital.confirm-patient.description" />,
                    <div>
                        {
                            confirmPatient.rawData.hasOwnProperty("health_id") && 
                            <p><Translate id="investigation.create.personal_data.fields.health_id" />: {confirmPatient.rawData["health_id"]}</p>
                        }
                        <p><Translate id="investigation.create.personal_data.fields.name" />: {confirmPatient.rawData["name"]}</p>
                        <p><Translate id="investigation.create.personal_data.fields.surnames" />: {confirmPatient.rawData["surnames"]}</p>
                        <p><Translate id="investigation.create.personal_data.fields.birthdate" />: {confirmPatient.rawData["birthdate"].toLocaleDateString()}</p>
                    </div>
                    ]
                }
            
        </Modal>
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            open={showSnackbar.show}
            autoHideDuration={4000}
            onClose={handleClose}>
                <Alert severity={showSnackbar.severity}>
                    <Translate id={showSnackbar.message} />
                    {
                        showSnackbar.severity === "success" &&
                        <Button onClick={goToPatient} size="small">
                            <Translate id="pages.hospital.go-to-patient" />
                        </Button>
                    }
                </Alert>
            </Snackbar>
        
        <Grid container spacing={3}>
            <GridContainer item xs={12}>
                {!props.patient &&
                    <PersonAddSharp style={{fontSize:"2.5rem"}} />
                }
                {
                    props.patient &&
                    <EditOutlined style={{fontSize:"2.5rem"}} />
                }
                <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
                {
                    !props.patient &&
                    <Translate id="pages.hospital.add-patient" />
                }
                {
                    props.patient &&
                    <Translate id="pages.hospital.edit-patient" />
                }
                </Typography>
            </GridContainer>
            <Grid item xs={12}>
                <Paper style={{padding:'1rem'}}>
                    <PersonalDataForm fields={ currentFields } hospital={true}
                        keyResearcherInvestigation={props.keyResearcherInvestigation}
                        submitText={props.patient ? "general.update" : null}
                        initialData={props.patient ? props.patient.personalData : null} 
                        callBackForm={(personalData, rawPersonalData) => callBackSaveUpdate(personalData, rawPersonalData)}/>
                </Paper>
            </Grid>
        </Grid>
    </BoxBckgr>
)
}

AddPatientComponent.propTypes = {
investigations:PropTypes.object

};

export default AddPatientComponent;