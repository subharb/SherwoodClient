import React, { useState } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { AllergyType, DrugType, PropsSmartFieldLocalized } from './index';
import DrugSelector from './DrugSelector';
import { Grid } from '@material-ui/core';
import { ButtonCancel } from '../mini_components';

function Allergy(props: PropsSmartFieldLocalized) {
    const [drug, setDrug] = useState<DrugType | null>(null);
    const [error, setError] = useState<boolean>(false);

    function drugSelected(drug:DrugType){
        setDrug(drug);
        const allergy:AllergyType={
            allergy:drug.name,
            "allergy-code":drug.code
        }
        props.elementSelected(allergy);
    }   
    return(
        <Grid container spacing={3}>
            <Grid xs={12}>
                <DrugSelector error={error} callbackError={(error) => setError(error)}  
                    drugSelected={(drug) => drugSelected(drug)} />
            </Grid>
            <Grid xs={12}>
                <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
            
        </Grid>
        
    )
}

export default withLocalize(Allergy);