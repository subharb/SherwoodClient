// @flow
import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField } from '@mui/material';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, {useState} from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { ButtonAccept, ButtonCancel } from '../mini_components';
import ICT from './ICT';
import { PropsSmartField, Diagnosis, BackgroundType, SmartFieldType, PropsSmartFieldLocalized, FamilyBackgroundType } from './index'

type Props = {

};

function FamilyBackground(props: PropsSmartFieldLocalized) {
    const [diagnose, setDiagnose] = useState<Diagnosis | null>(null);
    const [relation, setRelation] = useState<string>("");
    const [error, setError] = useState(false);
    const [errorRelation, setErrorRelation] = useState(false);

    function addBackground(){
        if(diagnose && relation){
            const background:FamilyBackgroundType = {"family-background":diagnose.ict, "family-background-code" : diagnose['ict-code'], "family-background-relation" : relation};
            props.elementSelected(background);
        }
        else{
            if(!diagnose){
                setError(true);
            }
            if(!relation){
                setErrorRelation(true);
            }
        }
    }

    function diagnoseSelected(element:SmartFieldType){
        console.log(element);
        const diag:Diagnosis = element as Diagnosis;
        //const backgr:BackgroundType = {background:diag.ict, "background-date" : diag['ict-code']};
        setDiagnose(diag);
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <ICT {...props} cancel={props.cancel} elementSelected={diagnoseSelected} error={error}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label={props.translate("hospital.family-relation")} variant="outlined" error={errorRelation}
                    onChange={(e) => setRelation(e.target.value)}  />
            </Grid>
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <ButtonAccept onClick={addBackground}><Translate id="general.add" /></ButtonAccept> 
                </Grid>
                <Grid item>
                    <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withLocalize(FamilyBackground)