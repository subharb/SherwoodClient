import { Button, Grid, Typography } from "@material-ui/core"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { ButtonAdd, IconGenerator, IconPatient } from "../../../components/general/mini_components"
import { PersonalData } from "../../../constants/types"
import {TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_MONITORING_VISIT_SURVEY } from '../../../constants';
import iconNotes from "../../../img/icons/history.png";
import iconImages from "../../../img/icons/images.png";
import iconLab from "../../../img/icons/lab.png";
import iconNotesGreen from "../../../img/icons/history_green.png";
import iconImagesGreen from "../../../img/icons/images_green.png";
import iconLabGreen from "../../../img/icons/lab_green.png";

interface Props{
    personalData:PersonalData,
    patientID:number,
    years:number,
    showMedical:boolean,
    action:any,
    typeSurveySelected:number,
    stay:any,
    medicalNotesCallBack:() =>void,
    editCallBack:() => void,
    labCallBack:() => void,
    testCallBack:() => void,
    addRecordCallBack: () => void,
    hospitalize?:() => void
    
}

const Container = styled(Grid)`
    background-color:white;
    position:sticky;
    border:1px red solid;
    top:53px;
    z-index:1000;
    @media (min-width: 768px) {
        top:60px;
    }
`

export const PatientToolBar:React.FC<Props> = ({personalData, patientID, showMedical,
                                                typeSurveySelected, action, years, 
                                                addRecordCallBack, hospitalize, medicalNotesCallBack, 
                                                editCallBack, labCallBack, testCallBack}) =>{

    return(
        <Container item container className="patient_toolbar" xs={12}>
            <Grid item container xs={3} >
                {/* <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {props.number}
                    </Typography>
                </Grid> */}
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}
                    onClick={editCallBack} >
                    <IconPatient gender={personalData ? personalData.sex : "undefined"} />
                </Grid>
            </Grid>
            <Grid item container xs={4}>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {
                            personalData &&
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
                            personalData.health_id &&
                            [<Translate id="investigation.create.personal_data.fields.health_id" />, ":", personalData.health_id]
                        }
                        {
                            !personalData.health_id &&
                            ["ID", ":", patientID ]
                        }                                    
                        
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {years} years
                    </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {stay} days
                    </Typography>
                </Grid> */}
            </Grid>
            {
                showMedical &&
                <Grid item container xs={5}  justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <Button data-testid="medical-notes" onClick={() => medicalNotesCallBack()} >
                            <img src={typeSurveySelected === TYPE_MEDICAL_SURVEY ? iconNotesGreen : iconNotes} alt="Medical Notes" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button data-testid="images" onClick={() => testCallBack()} >
                            <img src={typeSurveySelected === TYPE_IMAGE_SURVEY ? iconImagesGreen : iconImages} alt="Images" height="40" />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button data-testid="lab" onClick={() => labCallBack()} >
                            <img src={typeSurveySelected === TYPE_LAB_SURVEY ? iconLabGreen : iconLab} alt="Lab" height="40" />
                        </Button>
                    </Grid>

                    <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                        {
                            hospitalize &&
                            <Button data-testid="lab" onClick={ hospitalize} >
                                <IconGenerator type="hospital" />
                            </Button>
                        }
                        
                    </Grid>
                    <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                        <ButtonAdd disabled={action && action === "fill"} data-testid="add-record" onClick={addRecordCallBack} />
                    </Grid>
                    <Grid item xs={4} style={{display:'flex', justifyContent:'center'}}>
                        
                    </Grid>
                </Grid>
            }
            
        </Container>
    )
}