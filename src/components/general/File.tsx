import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { PhotoCamera, Replay } from '@material-ui/icons';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import { uploadFile, getFile } from '../../services/sherwoodService';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useUpdateEffect, usePrevious } from '../../hooks';
import styled from 'styled-components';
import { Check } from 'react-feather';
import LogoSherwood from '../../img/favicon-96x96.png';

enum UPLOAD_STATE{
    NOT_UPLOAD = 0,
    LOADING = 1,
    OK = 2,
    ERROR = 3,
  }
interface FileUpload{
    image?:FileList, status:UPLOAD_STATE, remoteName?:string
}
interface Props extends LocalizeContextProps{
    initialState : {listFiles:FileUpload[]},
    label:string,
    mode:string,
    value:{file:string, "file-date" : string}[],
    imagesSelected : (images : string[]) => void 
}

const OpacityLayer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-color:black;
    opacity:0.2;
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
    padding:0.5rem;
    height:10rem;
`;

const ImageFile = styled.img`
    max-width:100%;
    display:block;
    height:auto;
`;
const File:React.FC<Props> = (props) => {
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
            case UPLOAD_STATE.OK:
                return (
                    <StatusLayer>
                        <Check color="green" style={{ width: 60, height: 60}} />
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
        if(e !== null && e.target.files !== null){
            const value = e.target.files;
            console.log("File selected");
            let tempFilesSelected = [...filesSelected];
            
            tempFilesSelected.push({image:value, status:UPLOAD_STATE.LOADING});
            console.log(tempFilesSelected);
            setFilesSelected(tempFilesSelected);
            
        }
    }
    async function getFileIndex(index:number){
        try{
            const file = filesSelected[index];
            const response = await getFile(file.remoteName);
            return response;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    async function uploadFileIndex(index:number){
        try{
            const file = filesSelected[index];
            if(file.image){
                const response = await uploadFile(file.image[0]);
                return response;
            }
            else{
                return false;
            }
            
            
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    async function uploadAndUpdate(lastIndex:number){
        let tempFilesSelected = [...filesSelected];

        const response = await uploadFileIndex(lastIndex);
        
        if(response){
            tempFilesSelected[lastIndex].status = UPLOAD_STATE.OK;
            tempFilesSelected[lastIndex].remoteName = response.fileName as string;
            const remoteNames = tempFilesSelected.reduce((acc:string[],file) => {
                if(file.remoteName){
                    acc.push(file.remoteName as string);
                    return acc;
                }
                else{
                    return acc;
                }
            }, [])
            props.imagesSelected(remoteNames);
        }
        else{
            tempFilesSelected[lastIndex].status = UPLOAD_STATE.ERROR;
        }
        setFilesSelected(tempFilesSelected);
    }
    async function getAndUpdate(index:number){
        let tempFilesSelected = [...filesSelected];

        const response = await getFileIndex(index);
        
        if(response){
            tempFilesSelected[index].status = UPLOAD_STATE.OK;
            tempFilesSelected[index].image = response.file.Body
        }
        else{
            tempFilesSelected[index].status = UPLOAD_STATE.ERROR;
        }
        setFilesSelected(tempFilesSelected);
    }
    useEffect(()=>{
        async function changeFiles(){
            if(props.mode === "form"){
                if(prevFilesSelected){
                    if(prevFilesSelected.length < filesSelected.length){
                        //Mando la imagen al servidor
                        const lastIndex = filesSelected.length -1;
                        await uploadAndUpdate(lastIndex);
                    }
                    else if(prevFilesSelected.length > filesSelected.length){
                        //Borro la imagen que falte
                    }
                }
            }
            else{
                for(let i = 0; i < filesSelected.length; i++){
                    if(filesSelected[i].status !== UPLOAD_STATE.OK){
                        await getAndUpdate(i);
                    }
                } 
            }
        }
        
        changeFiles();
    }, [filesSelected]);
    useEffect(() =>{
        async function loadFiles(){
            if(props.mode === "show"){
                if(props.value && props.value.length > 0 ){
                    const tempFiles:FileUpload[] = props.value.map(file => {
                        return {
                            remoteName:file.file,
                            status:UPLOAD_STATE.LOADING
                        }
                    })
                    setFilesSelected(tempFiles);
                }
            }
        }
        loadFiles();
    }, []);
    return(
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                    {props.label}
                </Typography>
            </Grid>
            <Grid item container direction={'row'}  spacing={3} xs={12}>
                {
                    filesSelected.map((file, index) =>{
                        
                        if(props.mode === "form"){
                        
                                return(
                                    <GridImage item xs={2}>
                                        {
                                            renderFileStatus(file.status, index)
                                        }
                                        <OpacityLayer />
                                        
                                        <ImageFile src={URL.createObjectURL(file.image[0])} alt="imagen" />
                                    </GridImage>)                                
                        }
                        else{
                            if(file.image){
                                let buf = Buffer.from(file.image);
                                let base64 = buf.toString('base64');
                                return(
                                    <GridImage item xs={2}>
                                        <OpacityLayer />
                                        <ImageFile src={`data:image/jpeg;base64, ${base64}`} alt=""/>
                                    </GridImage>
                                )
                            }
                            else{
                                return(
                                    <GridImage item xs={2}>
                                        {
                                            renderFileStatus(UPLOAD_STATE.LOADING, index)
                                        }
                                        <OpacityLayer />
                                        <ImageFile src={LogoSherwood} width="100%" alt="Logo"/>
                                    </GridImage>
                                )
                            }
                        }
                    })
                }
                {
                    props.mode === "input" &&
                    
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
                }
                
            </Grid>
            
        </Grid>        
    )
}

export default withLocalize(File);