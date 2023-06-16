import { Button, Grid, Typography } from "@mui/material"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { ButtonAdd, IconGenerator, IconPatient } from "../../../components/general/mini_components"
import { DepartmentType, IUnit, PersonalData } from "../../../constants/types"
import {CATEGORY_DEPARTMENT_SHOE, CATEGORY_DEPARTMENT_SOCIAL, IMG_SURVEYS, LAB_SURVEYS, TYPE_FILL_LAB_SURVEY, TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_MONITORING_VISIT_SURVEY, TYPE_SHOE_SURVEY, TYPE_SOCIAL_SURVEY } from '../../../constants';
import iconNotes from "../../../img/icons/history.png";
import iconImages from "../../../img/icons/images.png";
import iconLab from "../../../img/icons/lab.png";
import iconDS from "../../../img/icons/ds.png";
import iconShoe from "../../../img/icons/shoe.png";
import iconNotesGreen from "../../../img/icons/history_green.png";
import iconImagesGreen from "../../../img/icons/images_green.png";
import iconLabGreen from "../../../img/icons/lab_green.png";
import { disabledTransition } from "@dnd-kit/sortable/dist/hooks/defaults"
import React from "react"

interface Props{
    personalData:PersonalData,
    patientID:number,
    years:number,
    readMedicalPermission:boolean,
    writeMedicalPermission:boolean,
    action:any,
    disabled:any,
    unitsResearcher:IUnit[],
    typeSurveysAvailable:number[],
    categorySurveys:number[],
    typeSurveySelected:number,
    categorySurveySelected:number,
    stay:any,
    medicalNotesCallBack:() =>void,
    editCallBack:() => void,
    labCallBack:() => void,
    socialCallBack:() => void,
    shoeCallBack:() => void,
    testCallBack:() => void,
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
                                                writeMedicalPermission, disabled, typeSurveysAvailable,
                                                unitsResearcher,
                                                typeSurveySelected, categorySurveys, categorySurveySelected, years, 
                                                addRecordCallBack, hospitalize, medicalNotesCallBack, 
                                                editCallBack, labCallBack, socialCallBack, shoeCallBack, testCallBack}) =>{

    // use memo to store if the researcher belongs to a department of type social
    const isResearcherSocial = React.useMemo(() => {
        return unitsResearcher.some(unit => unit.department.type === DepartmentType.SOCIAL)
    }, [unitsResearcher])
    // same but for shoe
    const isResearcherShoe = React.useMemo(() => {
        return unitsResearcher.some(unit => unit.department.type === DepartmentType.SHOE)
    }, [unitsResearcher])
    
    return (
        <Container item container className="patient_toolbar" xs={12}>
            <Grid item container xs={3} >
                {/* <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {props.number}
                    </Typography>
                </Grid> */}
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}
                    onClick={editCallBack} >
                    <IconPatient gender={personalData.sex ? personalData.sex : "undefined"} />
                </Grid>
            </Grid>
            <Grid item container xs={4}>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {
                            personalData.name &&
                            personalData.name+" "+personalData.surnames
                        }
                        {
                            !personalData &&
                            "Not available"
                        }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {
                            personalData?.health_id &&
                            [<Translate id="investigation.create.personal_data.fields.health_id" />, ":", personalData.health_id]
                        }
                        {
                            !personalData?.health_id &&
                            ["ID", ":", patientID ]
                        }                                    
                        
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {years} <Translate id="general.years" />
                    </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {stay} days
                    </Typography>
                </Grid> */}
            </Grid>
            {
                readMedicalPermission &&
                <Grid item container xs={5}  justifyContent="center" alignItems="center">
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="medical-notes" onClick={() => medicalNotesCallBack()} >
                            <img src={typeSurveySelected === TYPE_MEDICAL_SURVEY ? iconNotesGreen : iconNotes} alt="Medical Notes" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="images" onClick={() => testCallBack()} >
                            <img src={IMG_SURVEYS.includes(typeSurveySelected)  ? iconImagesGreen : iconImages} alt="Images" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                        <Button data-testid="lab" onClick={() => labCallBack()} >
                            <img src={LAB_SURVEYS.includes(typeSurveySelected)  ? iconLabGreen : iconLab} alt="Lab" height="40" />
                        </Button>
                    </Grid>
                    {
                        isResearcherSocial && categorySurveys.includes(CATEGORY_DEPARTMENT_SOCIAL) && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="social" onClick={() => socialCallBack()} >
                                <img src={categorySurveySelected === CATEGORY_DEPARTMENT_SOCIAL ? iconDS : iconDS} alt="Social" height="20" />
                            </Button>
                        </Grid>
                    }
                    {
                        isResearcherShoe && 
                        <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}>
                            <Button data-testid="show" onClick={() => shoeCallBack()} >
                                <img src={categorySurveySelected === CATEGORY_DEPARTMENT_SHOE ? iconShoe : iconShoe} alt="Social" height="40" />
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
                            <ButtonAdd disabled={disabled} data-testid="add-record" onClick={addRecordCallBack} />
                        }
                        
                    </Grid>
                    <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                        
                    </Grid>
                </Grid>
            }
            
        </Container>
    );
}