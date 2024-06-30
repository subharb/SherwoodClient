// @flow
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, {useState} from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { ButtonAccept, ButtonCancel } from '../mini_components';
import ICT from './ICT';
import { Diagnosis, BackgroundType, SmartFieldType, PropsSmartFieldLocalized } from './index'
import { formatDateByLocale } from '../../../utils';

type Props = {

};
function Background(props: PropsSmartFieldLocalized) {
    const [diagnose, setDiagnose] = useState<Diagnosis | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    function addBackground(){
        if(diagnose && date){
            const background:BackgroundType = {background:diagnose.ict, "background-code" : diagnose['ict-code'], "background-date" : date};
            props.elementSelected(background);
        }
        else{
            if(!diagnose){
                setError(true);
            }
            if(!date){
                setErrorDate(true);
            }
        }
    }

    function diagnoseSelected(element:SmartFieldType){
        console.log(element);
        const diag:Diagnosis = element as Diagnosis;
        //const backgr:BackgroundType = {background:diag.ict, "background-date" : diag['ict-code']};
        setDiagnose(diag);
    }

    const dateLabel = props.translate("general.date").toString();
    const emptyLabel = props.translate("hospital.background-date").toString();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <ICT {...props} error={error} cancel={props.cancel} elementSelected={diagnoseSelected} />
            </Grid>
            <Grid item xs={12}>
                <DatePicker value={date} label={dateLabel}
                        format={formatDateByLocale(props.activeLanguage.code)}
                        slotProps={{
                            textField: {
                              error: errorDate,
                              helperText: "Insert valid date",
                            },
                          }}
                        onChange={(value: Date | null) => {
                            const dateString = value && value.toISOString() ? value.toISOString() : null;
                            setDate(dateString);                         
                            setErrorDate(false);
                        }}/>
                
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

export default withLocalize(Background)