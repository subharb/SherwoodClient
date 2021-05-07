import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, {SyntheticEvent, useState} from 'react'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useUpdateEffect } from '../../hooks';
import styled from "styled-components";

enum UPLOAD_STATE{
    NOT_UPLOAD = 0,
    LOADING = 1,
    UPLOADED = 2,
    ERROR = 3,
  }
interface FileUpload{
    image:string, state:UPLOAD_STATE
}
interface Props extends LocalizeContextProps{
    initialState : {listFiles:FileUpload[]},
    label:string
}

const LoadingLayer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;
    opacity:0.6;
`;

const GridImage = styled(Grid)`
    display:flex;
    position:relative;
    align-items: center;
    justify-content: center;
`;

const Image:React.FC<Props> = (props) => {
    const [filesSelected, setFilesSelected] = useState<FileUpload[]>([]);
    function onFileSelected(e:React.ChangeEvent<HTMLInputElement>){
        if(e !== null){
            const value = URL.createObjectURL(e.target.files[0]);
            console.log("File selected");
            let tempFilesSelected = [...filesSelected];
            
            tempFilesSelected.push(value);
            console.log(tempFilesSelected);
            setFilesSelected(tempFilesSelected);
            
        }
    }
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
                    filesSelected.map(file =>{

                        return(
                            <GridImage item xs={2}>
                                <LoadingLayer>
                                    
                                </LoadingLayer>
                                <CircularProgress color="inherit" />
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