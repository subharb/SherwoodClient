import React, { useState } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { AllergyType, DrugType, PropsSmartFieldLocalized } from './index';
import DrugSelector from './DrugSelector';
import { Grid } from '@mui/material';
import { ButtonCancel } from '../mini_components';
import { Alert } from '@mui/material';

function Allergy(props: PropsSmartFieldLocalized) {
    const [drug, setDrug] = useState<DrugType | null>(null);
    const [error, setError] = useState<boolean>(false);

    function drugSelected(drug:DrugType){
        setDrug(drug);
        const allergy:AllergyType={
            allergy:drug.name,
            "compo-code":drug.id
        }
        props.elementSelected(allergy);
    }  
    
    if(error){
        return(
            <Alert severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>);
    }
    return(
        <Grid container spacing={0}>
            <Grid xs={12}>
                <DrugSelector type={props.type} variant={props.variant} error={error || props.error} 
                    callbackError={(error) => setError(error)}  
                    freeSolo
                    chemicalComponent country={props.country as string}
                    drugSelected={(drug) => drugSelected(drug)} />
            </Grid>
            <Grid xs={12} style={{paddingTop:'1rem'}}>
                <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
            
        </Grid>
        
    )
}

export default withLocalize(Allergy);