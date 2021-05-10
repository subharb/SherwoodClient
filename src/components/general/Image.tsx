import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { PhotoCamera, Replay } from '@material-ui/icons';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {uploadFile } from '../../services/sherwoodService';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useUpdateEffect, usePrevious } from '../../hooks';
import styled from "styled-components";
import { Check } from 'react-feather';

enum UPLOAD_STATE{
    NOT_UPLOAD = 0,
    LOADING = 1,
    UPLOADED = 2,
    ERROR = 3,
  }
interface FileUpload{
    image:string, status:UPLOAD_STATE
}
interface Props extends LocalizeContextProps{
    initialState : {listFiles:FileUpload[]},
    label:string
}

const OpacityLayer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;
    opacity:0.6;
`;

const StatusLayer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:1000;
`;

const GridImage = styled(Grid)`
    display:flex;
    position:relative;
    align-items: center;
    justify-content: center;
`;

const Image:React.FC<Props> = (props) => {
    const [filesSelected, setFilesSelected] = useState<FileUpload[]>([]);
    const prevFilesSelected:FileUpload[] | undefined = usePrevious(filesSelected);

    function renderFileStatus(status:number, index:number){
        switch(status){
            case UPLOAD_STATE.LOADING:
                return (
                    <StatusLayer>
                        <CircularProgress color="inherit" />
                    </StatusLayer>
                );
            case UPLOAD_STATE.UPLOADED:
                return (
                    <StatusLayer>
                        <Check />
                    </StatusLayer>
                );
            default:
                return (
                    <StatusLayer>
                        <Replay color="error" onClick={() => uploadAndUpdate(index)} />
                    </StatusLayer>)
        }
    }
    async function onFileSelected(e:React.ChangeEvent<HTMLInputElement>){
        if(e !== null){
            const value = URL.createObjectURL(e.target.files[0]);
            console.log("File selected");
            let tempFilesSelected = [...filesSelected];
            
            tempFilesSelected.push({image:value, status:UPLOAD_STATE.NOT_UPLOAD});
            console.log(tempFilesSelected);
            setFilesSelected(tempFilesSelected);
            
        }
    }
    async function uploadFileIndex(index:number){
        try{
            const file = filesSelected[index];
            const response = await uploadFile(file.image);
            return response.data;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    async function uploadAndUpdate(lastIndex:number){
        let tempFilesSelected = [...filesSelected];
        tempFilesSelected[lastIndex].status = UPLOAD_STATE.LOADING;
        setFilesSelected(tempFilesSelected);
        
        const response = await uploadFileIndex(lastIndex);
        
        if(response){
            tempFilesSelected[lastIndex].status = UPLOAD_STATE.UPLOADED;
        }
        else{
            tempFilesSelected[lastIndex].status = UPLOAD_STATE.ERROR;
        }
        setFilesSelected(tempFilesSelected);
    }
    useEffect(()=>{
        async function changeFiles(){
            if(prevFilesSelected){
                if(prevFilesSelected.length < filesSelected.length){
                    //Mando la imagen al servidor
                    const lastIndex = filesSelected.length -1;
                    uploadAndUpdate(lastIndex);
                }
                else if(prevFilesSelected.length > filesSelected.length){
                    //Borro la imagen que falte
                }
            }
        }
        
        changeFiles();
    }, [filesSelected]);
    useUpdateEffect(() =>{
        if(props.initialState && props.initialState.listFiles.length >0 ){
            setFilesSelected(props.initialState.listFiles);
        }
        
    }, [props.initialState]);
    return(
        // { fileSelected && 
        //     <img src={fileSelected} alt={label} width="80" />
        // }
        // { value.length > 2 && 
        //     <img src={value} alt={label} width="80" />
        // }
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                    {props.label}
                </Typography>
            </Grid>
            <Grid item container spacing={3} xs={12}>
                {
                    filesSelected.map((file, index) =>{

                        return(
                            <GridImage item xs={2}>
                                {
                                    renderFileStatus(file.status, index)
                                }
                                <OpacityLayer />
                                
                                <img src={file.image} alt="imagen" width="100%" />
                            </GridImage>)
                    })
                }
                <Grid item xs={2}>
                    <input accept="image/*" id="image" name="image" style={{display:'none'}} 
                        type="file" 
                        onChange={(e) => onFileSelected(e)} />
                    <label htmlFor="image">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
            
        </Grid>        
    )
}

export default withLocalize(Image);