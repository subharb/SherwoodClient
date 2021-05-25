import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { PropsSmartFieldLocalized, DrugType } from './index'
import { searchDrugService } from '../../../services/sherwoodService';

interface Props extends LocalizeContextProps {
    error:boolean;
    drugSelected:(drug:DrugType) => void,
    callbackError:(error:boolean) => void
}
function DrugSelector(props: Props) {
    const [drug, setDrug] = useState<DrugType | null>(null);
    const [searchDrug, setSearchDrug] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorDrug, setErrorDrug] = useState(false);
    const [drugOptions, setDrugOptions] = useState<DrugType[]>([]);
    
    
    function drugSelected(drug:DrugType){
        console.log(drug);
        setErrorDrug(false);
        setDrug(drug);
        props.drugSelected(drug);
    }

    useEffect(() => {
        async function searchDrugRemote(){
            try{
                setLoading(true);
                const response = await searchDrugService(searchDrug);
                if(response.status === 200){
                    setDrugOptions(response.drugs)
                }
                setLoading(false);
            }
            catch(error){
                console.log(error);
                props.callbackError(true);
                setLoading(false);
            }
            
        }
        if(!drug && searchDrug.length > 3){
            searchDrugRemote();
        }
    }, [searchDrug]);

    return(
        <Autocomplete
            id="drug"
            loading = {loading}
            noOptionsText="start typing"
            options={drugOptions}
            onInputChange={(event, value, reason) => {
                if(reason === "clear"){
                    setSearchDrug("");
                }
                else{
                    setSearchDrug(value);
                }
                
            }}
            onChange={(event, value, reason, details) => {
                if(value){
                    drugSelected(value);    
                }
            }}
        
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} value={searchDrug} error={errorDrug || props.error} 
                    label={props.translate("hospital.select-treatment")} variant="outlined" />}
        />
    );
}

export default withLocalize(DrugSelector);