import { Button, Grid, Typography } from "@mui/material"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { ButtonAdd, IconGenerator, IconPatient } from "../../../components/general/mini_components"
import { DepartmentType, IUnit, PersonalData } from "../../../constants/types"
import {CATEGORY_DEPARTMENT_NURSE, CATEGORY_DEPARTMENT_PRESCRIPTIONS, CATEGORY_DEPARTMENT_SHOE, CATEGORY_DEPARTMENT_SOCIAL, IMG_SURVEYS, TYPE_PRESCRIPTIONS, PATIENT_TOOLBAR_SECTION_IMAGE, PATIENT_TOOLBAR_SECTION_LAB, PATIENT_TOOLBAR_SECTION_MEDICAL, PATIENT_TOOLBAR_SECTION_NURSE, PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS, PATIENT_TOOLBAR_SECTION_SHOE, PATIENT_TOOLBAR_SECTION_SOCIAL, TYPE_FILL_LAB_SURVEY, TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_NURSE, TYPE_SHOE_SURVEY, TYPE_SOCIAL_SURVEY, CATEGORY_DEPARTMENT_NURSE_FW, CATEGORY_DEPARTMENT_CARE_GIVER_FW, CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW } from '../../../constants';
import iconNotes from "../../../img/icons/history.png";
import iconImages from "../../../img/icons/images.png";
import iconLab from "../../../img/icons/lab.png";
import iconDS from "../../../img/icons/ds.png";
import iconShoe from "../../../img/icons/shoe.png";
import iconNurse from "../../../img/icons/nursing_black.png";
import iconNurseGreen from "../../../img/icons/nursing_green.png";
import iconNotesGreen from "../../../img/icons/history_green.png";
import iconImagesGreen from "../../../img/icons/images_green.png";
import iconLabGreen from "../../../img/icons/lab_green.png";
import iconPrescriptions from "../../../img/icons/prescription_black.svg";
import iconPrescriptionsGreen from "../../../img/icons/prescription_green.svg";
import React from "react";
import { PERMISSION } from "../../../components/investigation/share/user_roles"

type SurveyType = | typeof TYPE_MEDICAL_SURVEY | typeof TYPE_IMAGE_SURVEY | typeof TYPE_SOCIAL_SURVEY | typeof TYPE_LAB_SURVEY |  typeof TYPE_SHOE_SURVEY | typeof TYPE_NURSE | typeof TYPE_PRESCRIPTIONS;

interface Props{
    personalData:PersonalData,
    patientID:number,
    years:number,
    permissions:PERMISSION[],
    readMedicalPermission:boolean,
    writeMedicalPermission:boolean,
    disabled:boolean,
    enableAddButton:boolean,
    unitsResearcher:IUnit[],
    categorySurveys:number[],
    buttonSelected:number,
    buttonClickedCallBack: (typeButtonClicked: SurveyType) => void,
    editCallBack:() => void,
    addRecordCallBack: () => void,
    hospitalize?:() => void,
    prescriptionsCallBack:() => void,
}

interface PropsComponent{
    sex:string,
    patientID:number,
    health_id:string,
    name:string,
    surnames:string,
    years:number,
    buttonSelected:number,
    buttonsAvailable:number[],
    enableAddButton:boolean,
    readMedicalPermission:boolean,
    writeMedicalPermission:boolean,
    buttonClickedCallBack: (typeButtonClicked: SurveyType) => void,
    editCallBack:(() => void) | null,
    addRecordCallBack: () => void,
    hospitalize?:() => void,
}

const Container = styled(Grid)`
    background-color:white;
    position:sticky;
    top:53px;
    z-index:1000;
    @media (min-width: 768px) {
        top:60px;
    }
`

export const PatientToolBar:React.FC<Props> = ({personalData, patientID, enableAddButton, permissions,
                                                unitsResearcher, categorySurveys, buttonSelected: categorySelected, years, 
                                                addRecordCallBack, hospitalize, buttonClickedCallBack, 
                                                editCallBack}) =>{
        
        const isResearcherSocial = React.useMemo(() => {
            return unitsResearcher.some(unit => unit.department.type === DepartmentType.SOCIAL)
        }, [unitsResearcher])
        // same but for shoe
        const isResearcherShoe = React.useMemo(() => {
            return unitsResearcher.some(unit => unit.department.type === DepartmentType.SHOE)
        }, [unitsResearcher])

        if(categorySurveys.includes(CATEGORY_DEPARTMENT_SOCIAL) && !isResearcherSocial){
            categorySurveys = categorySurveys.filter(category => category !== CATEGORY_DEPARTMENT_SOCIAL)
        }
        if(categorySurveys.includes(CATEGORY_DEPARTMENT_SHOE) && !isResearcherShoe){
            categorySurveys = categorySurveys.filter(category => category !== CATEGORY_DEPARTMENT_SHOE)
        }
        if(categorySurveys.includes(CATEGORY_DEPARTMENT_NURSE_FW) && !permissions.includes(PERMISSION.NURSE_FW)){
            categorySurveys = categorySurveys.filter(category => category !== CATEGORY_DEPARTMENT_NURSE_FW)
        }
        if(categorySurveys.includes(CATEGORY_DEPARTMENT_CARE_GIVER_FW) && !permissions.includes(PERMISSION.CARE_GIVER)){
            categorySurveys = categorySurveys.filter(category => category !== CATEGORY_DEPARTMENT_CARE_GIVER_FW)
        }
        if(categorySurveys.includes(CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW) && !permissions.includes(PERMISSION.NURSE_FW)){
            categorySurveys = categorySurveys.filter(category => category !== CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW)
        }
        const readMedicalPermission = permissions.includes(PERMISSION.MEDICAL_READ);
        const writeMedicalPermission = permissions.includes(PERMISSION.MEDICAL_WRITE);
        const canEditPersonalData = permissions.includes(PERMISSION.PERSONAL_ACCESS) ? editCallBack : null

        return <PatientToolBarComponent sex={personalData.sex} name={personalData!.name as string} 
                    health_id={personalData!.health_id as string} 
                    surnames={personalData!.surnames as string} patientID={patientID} 
                    buttonsAvailable={categorySurveys} buttonSelected={categorySelected}
                    readMedicalPermission={readMedicalPermission} 
                    writeMedicalPermission={writeMedicalPermission}
                    years={years} enableAddButton={enableAddButton}
                    addRecordCallBack={addRecordCallBack} hospitalize={hospitalize} 
                    buttonClickedCallBack={(typeButton:SurveyType) => buttonClickedCallBack(typeButton)}
                    editCallBack={canEditPersonalData}
                />
            
}

export const PatientToolBarComponent:React.FC<PropsComponent> = ({sex, patientID, name, surnames, readMedicalPermission,
                                                writeMedicalPermission, buttonsAvailable, health_id,
                                                buttonSelected, years, enableAddButton, buttonClickedCallBack,
                                                addRecordCallBack, hospitalize, editCallBack, 
                                            }) =>{
    
    return (
        <Container item container className="patient_toolbar" xs={12}>
            <Grid item container xs={3} >
                {
                    editCallBack && 
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}
                        onClick={editCallBack} >
                        <IconPatient gender={sex ? sex : "undefined"} />
                    </Grid>
                } 
            </Grid>
            <Grid item container xs={4}>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {
                            name &&
                            name+" "+surnames
                        }
                        {
                            !name || !surnames &&
                            "Not available"
                        }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {
                            health_id &&
                            [<Translate id="investigation.create.personal_data.fields.health_id" />, ":", health_id]
                        }
                        {
                            !health_id &&
                            ["ID", ":", patientID ]
                        }                                    
                        
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {years} <Translate id="general.years" />
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={5}  justifyContent="center" alignItems="center">
            {
                readMedicalPermission &&
                    <>
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="medical-notes" onClick={() => buttonClickedCallBack(TYPE_MEDICAL_SURVEY)} >
                                <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_MEDICAL ? iconNotesGreen : iconNotes} alt="Medical Notes" height="40" />
                            </Button>
                        </Grid>
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="images" onClick={() => buttonClickedCallBack(TYPE_IMAGE_SURVEY)} >
                                <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_IMAGE  ? iconImagesGreen : iconImages} alt="Images" height="40" />
                            </Button>
                        </Grid>
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="lab" onClick={() => buttonClickedCallBack(TYPE_LAB_SURVEY)} >
                                <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_LAB  ? iconLabGreen : iconLab} alt="Lab" height="40" />
                            </Button>
                        </Grid>
                        {
                            buttonsAvailable.includes(CATEGORY_DEPARTMENT_SOCIAL) && 
                            <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                                <Button data-testid="social" onClick={() => buttonClickedCallBack(TYPE_SOCIAL_SURVEY)} >
                                    <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_SOCIAL ? iconDS : iconDS} alt="Social" height="20" />
                                </Button>
                            </Grid>
                        }
                        {
                            buttonsAvailable.includes(CATEGORY_DEPARTMENT_SHOE) && 
                            <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                                <Button data-testid="shoe" onClick={() => buttonClickedCallBack(TYPE_SHOE_SURVEY)} >
                                    <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_SHOE ? iconShoe : iconShoe} alt="Social" height="40" />
                                </Button>
                            </Grid>
                        }
                        
                    </>
            }
                {
                    buttonsAvailable.includes(CATEGORY_DEPARTMENT_NURSE) && 
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="show" onClick={() => buttonClickedCallBack(TYPE_NURSE)} >
                            <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_NURSE ? iconNurseGreen : iconNurse} alt="Nurse" height="35" />
                        </Button>
                    </Grid>
                }
                {
                    buttonsAvailable.includes(CATEGORY_DEPARTMENT_NURSE_FW) && 
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="nurse_fw" onClick={() => buttonClickedCallBack(TYPE_NURSE)} >
                            <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_NURSE ? iconLabGreen : iconLab} alt="Nurse" height="35" />
                        </Button>
                    </Grid>
                }
                {
                    buttonsAvailable.includes(CATEGORY_DEPARTMENT_PRESCRIPTIONS) && 
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="show" onClick={() => buttonClickedCallBack(TYPE_PRESCRIPTIONS)} >
                            <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS ? iconPrescriptionsGreen : iconPrescriptions} alt="prescriptions" height="45" />
                        </Button>
                    </Grid>
                }
                {
                    buttonsAvailable.includes(CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW) && 
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="show" onClick={() => buttonClickedCallBack(TYPE_PRESCRIPTIONS)} >
                            <img src={buttonSelected === PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS ? iconPrescriptionsGreen : iconPrescriptions} alt="prescriptions" height="45" />
                        </Button>
                    </Grid>
                }
                <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                    {
                        (hospitalize && writeMedicalPermission) &&
                        <Button data-testid="lab" onClick={ hospitalize} >
                            <IconGenerator type="hospital" size="large" />
                        </Button>
                    }
                </Grid>
                <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                    {
                        writeMedicalPermission && 
                        <ButtonAdd disabled={enableAddButton} data-testid="add-record" onClick={addRecordCallBack} />
                    }
                </Grid>
                <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                    
                </Grid>
            </Grid>
        </Container>
    );
}