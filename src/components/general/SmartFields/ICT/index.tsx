import React, {useState}  from 'react'
import ICTSelectorFR  from './ICTSelectorSherwood'
import ICTSelectorOMS from './ICTSelectorOMS'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { SmartFieldType } from '..';
import { Grid, PropTypes, TextField } from '@material-ui/core';
import { ButtonAccept, ButtonCancel } from '../../mini_components';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { BackgroundType } from '../index';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import { PropsIctGeneral } from '../index';

const ICTSelectorGeneral:React.FC<PropsIctGeneral> = (props) => {
    const [diagnose, setDiagnose] = useState<SmartFieldType | null>(null);
    const [error, setError] = useState(false);
    
    const [relation, setRelation] = useState("");

    function cancel(){
        props.cancel();
    }
    
    function changeRelation(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setRelation(e.target.value);
    }
    function renderIctSelector(){
        if(["ena", "es", "ar"].indexOf(props.language) !== -1 ){
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
            <Grid item xs={12}>
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
        </Grid>)
}
export default withLocalize(ICTSelectorGeneral)