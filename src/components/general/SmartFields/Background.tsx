// @flow
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, {useState} from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { ButtonAccept, ButtonCancel } from '../mini_components';
import ICT from './ICT';
import { PropsSmartField, Diagnosis, BackgroundType, SmartFieldType, PropsSmartFieldLocalized } from './index'

type Props = {

};
function Background(props: PropsSmartFieldLocalized) {
    const [diagnose, setDiagnose] = useState<Diagnosis | null>(null);
    const [date, setDate] = useState<string | null | undefined>(null);
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
                <ICT {...props} error={error} cancel={false} elementSelected={diagnoseSelected} />
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider key="end-date" utils={DateFnsUtils} >
                    <KeyboardDatePicker
                        margin={props.typeMargin}
                        id="date"
                        inputVariant="outlined"
                        size="small"
                        label={date ? "" : dateLabel}
                        format="yyyy"
                        value={date}
                        views={["year"]}
                        defaultValue={date} 
                        openTo="year"
                        maxDate={new Date()}
                        onChange={(date: MaterialUiPickersDate, value?: string | null | undefined) => {
                            setDate(value);
                            setErrorDate(false);
                        }}
                        
                        emptyLabel={emptyLabel}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        error={errorDate} 
                        // helperText={errorString} 
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <ButtonAccept onClick={addBackground}><Translate id="general.add" /></ButtonAccept> 
                <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
            
        </Grid>
    );
};

export default withLocalize(Background)