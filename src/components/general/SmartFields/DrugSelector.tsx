import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { PropsSmartFieldLocalized, DrugType } from './index'
import { searchDrugComponentService, searchDrugService } from '../../../services/sherwoodService';
import AutocompleteSherwood from '../Autocomplete';
import { useOffline } from '../../../hooks';
import { OfflineField } from './OfflineField';

interface Props extends LocalizeContextProps {
    error:boolean;
    chemicalComponent?:boolean,
    country:string,
    variant:"standard" | "filled" | "outlined" | undefined,
    drugSelected:(drug:DrugType) => void,
    callbackError:(error:boolean) => void
}
function DrugSelector(props: Props) {
    const offline = useOffline();
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
    function getOffline(value:string){
        props.drugSelected({name:value, code:"offline"});
    }
    useEffect(() => {
        async function searchDrugRemote(){
            try{
                setLoading(true);
                let response;
                if(!props.chemicalComponent){
                    response = await searchDrugService(searchDrug, props.country);
                    if(response.status === 200){
                        setDrugOptions(response.drugs)
                    }
                }
                else{
                    response = await searchDrugComponentService(searchDrug, props.country);
                    if(response.status === 200){
                        setDrugOptions(response.drugComposition)
                    }
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

    if(offline){
        return <OfflineField error={props.error} variant={props.variant} callbackOffline={(value) => getOffline(value)} />
    }    
    return(
        <AutocompleteSherwood error={props.error} remoteSearch={searchDrugService} 
            country={props.country} getOptionsResponse={(option) => option.drugs}
            onValueSelected={(value) =>drugSelected(value)}
            getOptionLabel={(option) => option.name}/>
        // <Autocomplete
        //     id="drug"
        //     loading = {loading}
        //     noOptionsText="start typing"
        //     options={drugOptions}
        //     filterOptions={x => x}
        //     onInputChange={(event, value, reason) => {
        //         if(reason === "clear"){
        //             setSearchDrug("");
        //         }
        //         else{
        //             setSearchDrug(value);
        //         }
                
        //     }}
        //     onChange={(event, value, reason, details) => {
        //         if(value){
        //             drugSelected(value);    
        //         }
        //     }}
        
        //     getOptionLabel={(option) => option.name}
        //     style={{ width: 300 }}
        //     renderInput={(params) => <TextField {...params} value={searchDrug} error={errorDrug || props.error} 
        //             label={props.translate("hospital.select-treatment")} variant="outlined" />}
        // />
    );
}

export default withLocalize(DrugSelector);