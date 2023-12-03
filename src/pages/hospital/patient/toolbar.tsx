import { Button, Grid, Typography } from "@mui/material"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { ButtonAdd, IconGenerator, IconPatient } from "../../../components/general/mini_components"
import { DepartmentType, IUnit, PersonalData } from "../../../constants/types"
import {CATEGORY_DEPARTMENT_NURSE, CATEGORY_DEPARTMENT_PRESCRIPTIONS, CATEGORY_DEPARTMENT_SHOE, CATEGORY_DEPARTMENT_SOCIAL, IMG_SURVEYS, LAB_SURVEYS, PATIENT_TOOLBAR_SECTION_IMAGE, PATIENT_TOOLBAR_SECTION_LAB, PATIENT_TOOLBAR_SECTION_MEDICAL, PATIENT_TOOLBAR_SECTION_NURSE, PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS, PATIENT_TOOLBAR_SECTION_SHOE, PATIENT_TOOLBAR_SECTION_SOCIAL, TYPE_FILL_LAB_SURVEY, TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_MONITORING_VISIT_SURVEY, TYPE_SHOE_SURVEY, TYPE_SOCIAL_SURVEY } from '../../../constants';
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

import React from "react"

interface Props{
    personalData:PersonalData,
    patientID:number,
    years:number,
    readMedicalPermission:boolean,
    writeMedicalPermission:boolean,
    disabled:boolean,
    enableAddButton:boolean,
    unitsResearcher:IUnit[],
    categorySurveys:number[],
    typeSurveySelected:string,
    categorySelected:number,
    medicalNotesCallBack:() =>void,
    editCallBack:() => void,
    labCallBack:() => void,
    socialCallBack:() => void,
    shoeCallBack:() => void,
    testCallBack:() => void,
    nurseCallBack:() => void,
    addRecordCallBack: () => void,
    hospitalize?:() => void,
}

interface PropsComponent{
    sex:string,
    patientID:number,
    health_id:string,
    name:string,
    surnames:string,
    years:number,
    categorySelected:number,
    categoriesAvailable:number[],
    enableAddButton:boolean,
    readMedicalPermission:boolean,
    writeMedicalPermission:boolean,
    medicalNotesCallBack:() =>void,
    editCallBack:() => void,
    labCallBack:() => void,
    socialCallBack:() => void,
    shoeCallBack:() => void,
    testCallBack:() => void,
    nurseCallBack:() => void,
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
export const PatientToolBar:React.FC<Props> = ({personalData, patientID, readMedicalPermission,
                                                    writeMedicalPermission, enableAddButton,
                                                    unitsResearcher, categorySurveys, categorySelected, years, 
                                                    addRecordCallBack, hospitalize, medicalNotesCallBack, nurseCallBack,
                                                    editCallBack, labCallBack, socialCallBack, shoeCallBack, testCallBack}) =>{
        
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

        return <PatientToolBarComponent sex={personalData.sex} name={personalData!.name as string} 
                health_id={personalData!.health_id as string} 
                surnames={personalData!.surnames as string} patientID={patientID} 
                categoriesAvailable={categorySurveys} categorySelected={categorySelected}
                readMedicalPermission={readMedicalPermission} 
                writeMedicalPermission={writeMedicalPermission}
                years={years}
                
                addRecordCallBack={addRecordCallBack} hospitalize={hospitalize} 
                medicalNotesCallBack={medicalNotesCallBack} nurseCallBack={nurseCallBack}
                editCallBack={editCallBack} labCallBack={labCallBack} socialCallBack={socialCallBack} 
                shoeCallBack={shoeCallBack} testCallBack={testCallBack} 
                />
            
    }
export const PatientToolBarComponent:React.FC<PropsComponent> = ({sex, patientID, name, surnames, readMedicalPermission,
                                                writeMedicalPermission, categoriesAvailable, health_id,
                                                categorySelected, years, enableAddButton,
                                                addRecordCallBack, hospitalize, medicalNotesCallBack, nurseCallBack,
                                                editCallBack, labCallBack, socialCallBack, shoeCallBack, testCallBack
                                            }) =>{
    
    return (
        <Container item container className="patient_toolbar" xs={12}>
            <Grid item container xs={3} >
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}
                    onClick={editCallBack} >
                    <IconPatient gender={sex ? sex : "undefined"} />
                </Grid>
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
                            health_id &&
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
            {
                readMedicalPermission &&
                <Grid item container xs={5}  justifyContent="center" alignItems="center">
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="medical-notes" onClick={() => medicalNotesCallBack()} >
                            <img src={categorySelected === PATIENT_TOOLBAR_SECTION_MEDICAL ? iconNotesGreen : iconNotes} alt="Medical Notes" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="images" onClick={() => testCallBack()} >
                            <img src={categorySelected === PATIENT_TOOLBAR_SECTION_IMAGE  ? iconImagesGreen : iconImages} alt="Images" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="lab" onClick={() => labCallBack()} >
                            <img src={categorySelected === PATIENT_TOOLBAR_SECTION_LAB  ? iconLabGreen : iconLab} alt="Lab" height="40" />
                        </Button>
                    </Grid>
                    {
                        categoriesAvailable.includes(CATEGORY_DEPARTMENT_SOCIAL) && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="social" onClick={() => socialCallBack()} >
                                <img src={categorySelected === PATIENT_TOOLBAR_SECTION_SOCIAL ? iconDS : iconDS} alt="Social" height="20" />
                            </Button>
                        </Grid>
                    }
                    {
                        categoriesAvailable.includes(CATEGORY_DEPARTMENT_SHOE) && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="show" onClick={() => shoeCallBack()} >
                                <img src={categorySelected === PATIENT_TOOLBAR_SECTION_SHOE ? iconShoe : iconShoe} alt="Social" height="40" />
                            </Button>
                        </Grid>
                    }
                    {
                        categoriesAvailable.includes(CATEGORY_DEPARTMENT_NURSE) && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="show" onClick={() => nurseCallBack()} >
                                <img src={categorySelected === PATIENT_TOOLBAR_SECTION_NURSE ? iconNurseGreen : iconNurse} alt="Nurse" height="35" />
                            </Button>
                        </Grid>
                    }
                    {
                        categoriesAvailable.includes(CATEGORY_DEPARTMENT_PRESCRIPTIONS) && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="show" onClick={() => nurseCallBack()} >
                                <img src={categorySelected === PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS ? iconPrescriptionsGreen : iconPrescriptions} alt="prescriptions" height="45" />
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
            }
            
        </Container>
    );
}