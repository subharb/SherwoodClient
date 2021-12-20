import { Grid, TextField, Typography } from '@material-ui/core';
import { Label, Translate } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from "react";
import { withLocalize } from 'react-localize-redux';
import { PropsSmartFieldLocalized } from ".";
import { ButtonAccept, ButtonCancel } from '../mini_components';


function BMIField(props: PropsSmartFieldLocalized) {
    const [errorWeight, setErrorWeight] = useState(false);
    const [errorHeight, setErrorHeight] = useState(false);
    const [weight, setWeight] = useState<string|boolean>(false);
    const [height, setHeight] = useState<string|boolean>(false);
    const [bmi, setBmi] = useState<number|boolean>(false);

    function updateWeight(value:string){
        console.log(value);
        setWeight(value);
        
    }

    function saveBMI(){
        if(bmi !== false){}
    }

    function updateBMI(){
        if(Number(weight) && Number(height)){
            const heightMetres = Number(height)/100;
            const tempBMI:number = (Number(weight)/(heightMetres*heightMetres));
            setBmi(tempBMI);
        }
        else{
            setBmi(false);
        }
    }

    useEffect(() => {
        if(!Number(weight) && weight !== false){
            setErrorWeight(true);
        }
        else{
            setErrorWeight(false);
            updateBMI();
        }
    }, [weight])

    useEffect(() => {
        if(!Number(height) && height !== false){
            setErrorHeight(true);
        }
        else{
            setErrorWeight(false);
            updateBMI();
        }
    }, [height])

    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="body2" component="span">{props.translate("hospital.bmi")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label={props.translate("hospital.bmi-weight")} variant="outlined" error={errorWeight}
                    onChange={(e) => updateWeight(e.target.value)}/>
                <TextField label={props.translate("hospital.bmi-height")} style={{marginLeft: '20px'}} variant="outlined" error={errorHeight}
                    onChange={(e) => setHeight(e.target.value)} value={height === false ? "" : height} />
                
            </Grid>
            {
                bmi &&
                <Grid item xs={12}>
                    <Typography variant="body2" component="span">Result : {bmi.toFixed(2)}</Typography>
                </Grid>
            }
            
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <ButtonAccept onClick={saveBMI}><Translate id="general.add" /></ButtonAccept> 
                </Grid>
                <Grid item>
                    <ButtonCancel onClick={props.cancel} ><Translate id="general.cancel" /></ButtonCancel>
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export default withLocalize(BMIField);