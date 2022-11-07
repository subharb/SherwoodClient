import { Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { useEffect } from 'react';
import { useState } from "react";
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';

import { ButtonAccept, ButtonEdit } from '../mini_components';

import { BMIType } from '.';
import { isString } from 'lodash';

interface Props extends LocalizeContextProps {
    elementSelected:(bmi:BMIType) => void
}

const RedTypography = withStyles({
    root: {
      color: "red"
    }
  })(Typography);

function BMIField(props: Props) {
    
    const [errorWeight, setErrorWeight] = useState(false);
    const [showError, setShowError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errorHeight, setErrorHeight] = useState(false);
    const [weight, setWeight] = useState<string|boolean>(false);
    const [height, setHeight] = useState<string|boolean>(false);
    const [bmi, setBmi] = useState<number| null>(null);

    function updateWeight(value:string){
        console.log(value);
        setWeight(value);
    }

    function saveBMI(){
        if(bmi !== null && isString(weight) && isString(height)){
            setShowError(false);
            setSaved(true);
            const bmiElement:BMIType = {bmi:bmi, bmi_height:parseFloat(height), bmi_weight:parseFloat(weight)};
            props.elementSelected(bmiElement);
        }
        else{
            setShowError(true);
        }
    }
    function editBMI(){
        setSaved(false);
    }
    function updateBMI(){
        if(Number(weight) && Number(height)){
            const heightMetres = Number(height)/100;
            const tempBMI:number = (Number(weight)/(heightMetres*heightMetres));
            setBmi(tempBMI);
            setShowError(false);
        }
        else{
            setBmi(null);
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
            {/* <Grid item xs={12}>
                <Typography variant="body2" component="span">{props.translate("hospital.bmi")}</Typography>
            </Grid> */}
            {
                !saved &&
                <Grid item xs={12}>
                    <TextField label={props.translate("hospital.bmi-weight")} variant="outlined" error={errorWeight || showError}
                        onChange={(e) => updateWeight(e.target.value)} value={weight === false ? "" : weight}/>
                    <TextField label={props.translate("hospital.bmi-height")} style={{marginLeft: '20px'}} variant="outlined" error={errorHeight || showError}
                        onChange={(e) => setHeight(e.target.value)} value={height === false ? "" : height} />
                </Grid>
            }
            {
                saved && 
                <Grid item xs={12}>
                    <Typography variant="h3" component="span">Result : {typeof(bmi) === 'number' ? bmi.toFixed(2) : "undefined"}</Typography>
                    <ButtonEdit onClick={editBMI} ><Translate id="general.edit" /></ButtonEdit>
                </Grid>
            }
            
            {
                (bmi && !saved) &&
                <Grid item xs={12}>
                    <Typography variant="body2" component="span">Result : {typeof(bmi) === 'number' ? bmi.toFixed(2) : "undefined"}</Typography>
                </Grid>
            }
            {
                showError &&
                <Grid item xs={12}>
                    <RedTypography variant="body2" ><Translate id="hospital.bmi-error-message" /></RedTypography>
                </Grid>
            }
            {
                !saved &&
                <Grid container item xs={12} spacing={1}>
                    <Grid item>
                        <ButtonAccept onClick={saveBMI}><Translate id="general.add" /></ButtonAccept> 
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

export default withLocalize(BMIField);