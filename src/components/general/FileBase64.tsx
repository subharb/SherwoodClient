import { Grid, IconButton, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';
import props from '../../theme/props';
import { CloseButton, CloseFrame, RedFormHelperText } from './mini_components';

interface FileBase64Props {
    label : string,
    error:boolean,
    value:string,
    callBackBase64 : (imgBase64:string) => void
}

export const FileBase64: React.FC<FileBase64Props> = ({ label, error ,value , callBackBase64 }) => {
    
    const [imageSelected, setImageSelected] = useState("");

    useEffect(() => {
        setImageSelected(value);
    }, [value])
    function onFileSelected(event:any){
        // var tmppath = URL.createObjectURL(event.target.files[0]);
        // console.log(tmppath);
        // setImageSelected(tmppath);

        var fileToLoad = event.target.files[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            if(fileLoadedEvent && fileLoadedEvent.target){
                var srcData = fileLoadedEvent.target.result?.toString(); // <--- data: base64
                if(srcData){
                    setImageSelected(srcData);
                    callBackBase64(srcData);
                }
            }
            
            
        }
        fileReader.readAsDataURL(fileToLoad);
    }
    function resetField(){
        setImageSelected("");  
        callBackBase64(""); 
    }

    if(imageSelected !== "" ){
        return(
            <>
                <Grid container xs={12} style={{paddingBottom: '10px'}}>
                    <Grid item xs={12}> 
                        <Typography variant="body2" gutterBottom>
                            {label}
                        </Typography>
                    </Grid> 
                    <Grid item xs={12} style={{paddingTop:'10px'}}>
                        <CloseFrame onClick={resetField}>
                            <img  src={imageSelected} width="100" alt="logo" />
                        </CloseFrame>
                    </Grid> 
            </Grid>
            </>
            
        )
    }
    return <>
        <div id="imgTest" ></div>
        <Grid container xs={12}>
            <Typography variant="body2" gutterBottom>
                {label}
            </Typography>
        </Grid>
        <input accept="image/*" id="image" name="image" style={{display:'none'}} 
                type="file" 
                onChange={(e) => onFileSelected(e)} />
        <label htmlFor="image">
            <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                <PhotoCamera />
            </IconButton>
        </label>
        {
            error &&
            <Grid container xs={12}>
                <RedFormHelperText>
                    <Translate id="general.field-required" />
                </RedFormHelperText>
            </Grid>
        }
    </>;
};

export default FileBase64;
