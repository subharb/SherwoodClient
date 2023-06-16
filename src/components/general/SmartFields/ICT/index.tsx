import React, {useState}  from 'react'
import ICTSelectorFR  from './ICTSelectorSherwood'
import ICTSelectorOMS from './ICTSelectorOMS'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { PropsSmartFieldLocalized, SmartFieldType } from '..';
import { Grid } from '@mui/material';
import { ButtonCancel } from '../../mini_components';
import { useOffline } from '../../../../hooks';
import { OfflineField } from '../OfflineField';

interface ICTProps extends PropsSmartFieldLocalized{
    resetICTSelectorCallback?: () => void
}
const ICTSelectorGeneral:React.FC<ICTProps> = (props) => {
    const offline = useOffline();

    function getOffline(value:string){
        props.elementSelected({"ict" : value, "ict-code" : "offline"});
    }
    function renderIctSelector(){
        if(offline){
            return <OfflineField label={props.translate(`hospital.select-ict`).toString()} error={props.error} 
                        variant={props.variant} callbackOffline={(value) => getOffline(value)} />
        }
        else{
            if(["en", "es", "ar", "fr"].indexOf(props.language) !== -1 ){
                return <ICTSelectorOMS type={props.type}  variant="outlined" margin={props.typeMargin} 
                            cancel={props.cancel} language={props.language} error={props.error}
                            size="small" elementSelected={props.elementSelected} 
                            resetICTSelectorCallback = {props.resetICTSelectorCallback}/>
            }
            //Francés está incluido en la OMS, este componente se deberá reusar cuando tengamos otro idioma
            //Que no esté en la api de la OMS
            // else{
            //     return <ICTSelectorFR type={props.type} variant="outlined" language={props.language}
            //                 cancel={props.cancel} size="small" error={props.error}  typeMargin={props.typeMargin} 
            //                 diagnose={diagnose} setError={(error) => setError(error)}
            //                 elementSelected={props.elementSelected} />
            // }
        }
        
    }
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                { renderIctSelector() }
            </Grid>
            {
                props.cancel && 
                <Grid item xs={6}>
                    <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
                </Grid> 
            }
        </Grid>)
}
export default withLocalize(ICTSelectorGeneral)