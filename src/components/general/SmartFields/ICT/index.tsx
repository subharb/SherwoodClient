import React, {useState}  from 'react'
import ICTSelectorFR  from './ICTSelectorSherwood'
import ICTSelectorOMS from './ICTSelectorOMS'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { PropsSmartFieldLocalized, SmartFieldType } from '..';
import { Grid, PropTypes, TextField } from '@material-ui/core';
import { ButtonAccept, ButtonCancel } from '../../mini_components';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { BackgroundType } from '../index';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import { PropsSmartField } from '../index';
import { useOffline } from '../../../../hooks';
import { OfflineField } from '../OfflineField';

const ICTSelectorGeneral:React.FC<PropsSmartFieldLocalized> = (props) => {
    const offline = useOffline();
    const [diagnose, setDiagnose] = useState<SmartFieldType | null>(null);
    const [error, setError] = useState(false);
    
    const [relation, setRelation] = useState("");
    
    function changeRelation(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setRelation(e.target.value);
    }
    function getOffline(value:string){
        props.elementSelected({"ict" : value, "ict-code" : "offline"});
    }
    function renderIctSelector(){
        if(offline){
            return <OfflineField error={props.error} variant={props.variant} callbackOffline={(value) => getOffline(value)} />
        }
        else{
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
        
    }
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                { renderIctSelector() }
            </Grid>
            {
                props.cancel && 
                <Grid xs={12}>
                    <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
                </Grid> 
            }
        </Grid>)
}
export default withLocalize(ICTSelectorGeneral)