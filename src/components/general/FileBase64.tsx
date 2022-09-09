import { Grid, IconButton, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import props from '../../theme/props';
import { CloseButton, CloseFrame } from './mini_components';

interface FileBase64Props {
    label : string,
    callBackBase64 : (imgBase64:string) => void
}



export const FileBase64: React.FC<FileBase64Props> = ({ label, callBackBase64 }) => {
    const [imageSelected, setImageSelected] = useState("");

    function onFileSelected(event:any){
        // var tmppath = URL.createObjectURL(event.target.files[0]);
        // console.log(tmppath);
        // setImageSelected(tmppath);

        var fileToLoad = event.target.files[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            setImageSelected(srcData);
            callBackBase64(srcData);
            
        }
        fileReader.readAsDataURL(fileToLoad);
    }
    function resetField(){
        setImageSelected("");   
    }

    if(imageSelected !== ""){
        return(
            <CloseFrame onClick={resetField}>
                <img  src={imageSelected} width="100" />
            </CloseFrame>
        )
    }
    return (
        <>
            <div id="imgTest" ></div>
            <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                    {label}
                </Typography>
            </Grid>
            <input accept="image/*,application/pdf,application/vnd.ms-excel" id="image" name="image" style={{display:'none'}} 
                    type="file" 
                    onChange={(e) => onFileSelected(e)} />
            <label htmlFor="image">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </>
    );
};

export default FileBase64;
