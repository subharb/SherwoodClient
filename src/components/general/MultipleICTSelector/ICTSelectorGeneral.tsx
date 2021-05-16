import React, {useState}  from 'react'
import ICTSelectorFR  from './ICTSelectorFR'
import ICTSelectorOMS from './ICTSelectorOMS'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { Smartfield } from '.';
import { Grid, PropTypes, TextField } from '@material-ui/core';
import { ButtonAccept, ButtonCancel } from '../mini_components';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Background } from './index';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';


export interface PropsIctGeneral extends LocalizeContextProps{
    //value:Diagnosis[] | false;   
    //margin:string,
    
    variant:"standard" | "filled" | "outlined" | undefined,
    size:string,
    language:string,
    typeMargin:PropTypes.Margin | undefined,
    type:string,
    cancel: () => void,
    elementSelected: (element:Smartfield) => void,
    error:boolean,
}
export interface PropsIct extends PropsIctGeneral{
    
    diagnose:Smartfield | null,
    
    setError:(error:boolean) => void,
    
    
}

const ICTSelectorGeneral:React.FC<PropsIctGeneral> = (props) => {
    const [diagnose, setDiagnose] = useState<Smartfield | null>(null);
    const [date, setDate] = useState<string | null | undefined>(null);
    const [error, setError] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [relation, setRelation] = useState("");

    function cancel(){
        props.cancel();
    }
    function addBackground(){
        if(diagnose && date){
            const background = diagnose as Background;
            background["background-date"] = date;
            props.elementSelected(diagnose);
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
    function changeRelation(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setRelation(e.target.value);
    }
    function renderIctSelector(){
        if(["en", "es", "ar"].indexOf(props.language) !== -1 ){
            return <ICTSelectorOMS type={props.type}  variant="outlined" margin={props.typeMargin} 
                cancel={props.cancel} language={props.language}
                size="small" elementSelected={props.elementSelected} />
        }
        else{
            return <ICTSelectorFR type={props.type} variant="outlined" language={props.language}
                        cancel={props.cancel} size="small" error={props.error}  typeMargin={props.typeMargin} 
                        diagnose={diagnose} setError={(error) => setError(error)}
                        elementSelected={props.elementSelected} />
        }
    }
    const dateLabel = props.translate("general.date").toString();
    const emptyLabel = props.translate("hospital.background-date").toString();
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                { renderIctSelector() }
            </Grid>
            {
                props.type === "family-background" &&
            
                <Grid item xs={12}>
                    <TextField value={relation} onChange={(event) => changeRelation(event)} />
                </Grid>
                
            }
            
            {
                props.type === "background" &&
                
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
            }
            
            <Grid item xs={12}>
            {
                props.type === "background" &&
                <ButtonAccept onClick={addBackground}><Translate id="general.add" /></ButtonAccept>
            }
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
        </Grid>)
}
export default withLocalize(ICTSelectorGeneral)