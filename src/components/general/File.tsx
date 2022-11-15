import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { PhotoCamera, Replay } from '@material-ui/icons';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import { uploadFile, getFile } from '../../services';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useUpdateEffect, usePrevious } from '../../hooks';
import styled from 'styled-components';
import { Check } from 'react-feather';
import Modal from './modal';
import LogoSherwood from '../../img/favicon-96x96.png';
import PDFLogo from '../../img/pdf_logo.jpeg';
import { isImageType } from '../../utils';
import { CloseFrame } from './mini_components';

enum UPLOAD_STATE{
    NOT_UPLOAD = 0,
    LOADING = 1,
    OK = 2,
    ERROR = 3,
}

interface PostFile{
    file:string, 
    file_type:string
}
interface FileUpload{
    image?:FileList, 
    buffer?:string,
    type:string,
    status:UPLOAD_STATE, 
    remoteName?:string
}
interface Props extends LocalizeContextProps{
    initialState : {listFiles:FileUpload[]},
    label:string,
    mode:string,
    value:{file:string, file_type : string}[],
    imagesSelected : (images : PostFile[]) => void 
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
    display:inline-block;
    position:relative;
    align-items: center;
    justify-content: center;
    padding:0.5rem;
    max-height:10rem;
    max-width: 10rem;
    overflow: hidden;
`;

const ImageFile = styled.img`
    max-width:100%;
    display:block;
    height:auto;
    cursor:pointer;
`;
const File:React.FC<Props> = (props) => {
    const [filesSelected, setFilesSelected] = useState<FileUpload[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [bufferDataFile, setBufferDataFile] = useState("");
    const prevFilesSelected:FileUpload[] | undefined = usePrevious(filesSelected);
    const prevValue:FileUpload[] | undefined = usePrevious(props.value);
    const [addingFile, setAddingFile] = useState(false);

    function removeFile(index:number){
        let newFilesSelected = [...filesSelected];
        newFilesSelected.splice(index, 1);
        setFilesSelected(newFilesSelected);
        let remoteNames:PostFile[] = [];
        for(let i = 0; i < newFilesSelected.length; i++){
            const file = newFilesSelected[i];
            const element:PostFile = {
                file:file.remoteName as string,
                file_type : file.type
            }
            remoteNames.push(element);
        }
        
        props.imagesSelected(remoteNames);
    }
    function showFullSize(index:number){
        const file = filesSelected[index];
        if(file.buffer){
            let buf = Buffer.from(file.buffer);
            let base64 = buf.toString('base64');
            setBufferDataFile(base64);
            setShowModal(true);
        }
        
    }
    function downloadPDF(indexPDF:number){
        console.log("El archivo es el ", indexPDF);

        const dataBuffer = filesSelected[indexPDF].buffer;
        if(dataBuffer){
            let buf = Buffer.from(dataBuffer);
        
            const link = document.createElement('a');
            // create a blobURI pointing to our Blob
            const arr = new Uint8Array(buf);
            const blob = new Blob([arr], { type: 'application/pdf' });
            link.href = URL.createObjectURL(blob);
            link.download = filesSelected[indexPDF].remoteName as string;
            // some browser needs the anchor to be in the doc
            document.body.append(link);
            link.click();
            link.remove();
        }
        
    }
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
        if(e !== null && e.target.files !== null && e.target.files.length > 0){
            const value = e.target.files;
            console.log("File selected");
            let tempFilesSelected = [...filesSelected];
            
            tempFilesSelected.push({image:value, status:UPLOAD_STATE.LOADING, type:value[0].type});
            console.log(tempFilesSelected);
            setAddingFile(true);
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
            let remoteNames:PostFile[] = [];
            for(let i = 0; i < tempFilesSelected.length; i++){
                const file = tempFilesSelected[i];
                const element:PostFile = {
                    file:file.remoteName as string,
                    file_type : file.type
                }
                remoteNames.push(element);
            }
            
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
            tempFilesSelected[index].buffer = response.file.Body
        }
        else{
            tempFilesSelected[index].status = UPLOAD_STATE.ERROR;
        }
        setFilesSelected(tempFilesSelected);
    }
    useEffect(()=>{
        async function changeFiles(){
            if((props.value && props.value.length > 0) && (filesSelected.length === props.value.length) && !addingFile){
                // si es el mount inicial, me traigo los archivos
                for(let i = 0; i < filesSelected.length; i++){
                    if(!((filesSelected[i].status === UPLOAD_STATE.OK) || (filesSelected[i].status === UPLOAD_STATE.ERROR))){
                        await getAndUpdate(i);
                    }
                } 
            }
            else if(prevFilesSelected){
                    if(prevFilesSelected.length < filesSelected.length && addingFile){
                        //Mando la imagen al servidor
                        const lastIndex = filesSelected.length -1;
                        await uploadAndUpdate(lastIndex);
                        setAddingFile(false);
                    }
                    else if(prevFilesSelected.length > filesSelected.length){
                        //Borro la imagen que falte
                    }
                }
            }
        
        changeFiles();
    }, [filesSelected]);
    useEffect(() =>{
        async function loadFiles(){
            if(typeof prevValue === "undefined" && props.value && props.value.length > 0 ){
                const tempFiles:FileUpload[] = props.value.map(file => {
                    return {
                        remoteName:file.file,
                        status:UPLOAD_STATE.LOADING,
                        type:file.file_type
                    }
                })
                setFilesSelected(tempFiles);
            }
        }
        loadFiles();
    }, [props.value]);
    
    return(
        <Grid container>
            <Modal
                open={showModal}
                closeModal={() => setShowModal(false)}
                >
                <ImageFile src={`data:image/jpeg;base64, ${bufferDataFile}`} width="100%" alt="Logo"/>
            </Modal>
            <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                    {props.label}
                </Typography>
            </Grid>
            <Grid className='files_container' item container direction={'row'}  spacing={3} xs={12}>
                {
                    filesSelected.map((file, index) =>{
                        if(file.image){
                            if(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"){
                                return(
                                    <CloseFrame hide={props.mode === "show"} onClick={() => removeFile(index)}>
                                        <GridImage item>
                                            {
                                                renderFileStatus(file.status, index)
                                            }
                                            <OpacityLayer />
                                            
                                            <ImageFile src={URL.createObjectURL(file.image[0])} alt="imagen" />
                                        </GridImage>
                                    </CloseFrame>) 
                            }
                            else{
                                return(
                                    <CloseFrame hide={props.mode === "show"} onClick={() => removeFile(index)}>
                                        <GridImage>
                                            {
                                                renderFileStatus(file.status, index)
                                            }
                                            <OpacityLayer />
                                            
                                            <ImageFile src={PDFLogo} alt="pdf" />
                                        </GridImage>
                                    </CloseFrame>) 
                            }
                             
                        }
                        if(file.buffer){
                            if(isImageType(file.type)){
                                let buf = Buffer.from(file.buffer);
                                let base64 = buf.toString('base64');
                                return(
                                    <CloseFrame hide={props.mode === "show"} onClick={() => removeFile(index)}>
                                        <GridImage item xs={2}>
                                            <ImageFile onClick={() => showFullSize(index)} src={`data:image/jpeg;base64, ${base64}`} alt=""/>
                                        </GridImage>
                                    </CloseFrame>
                                )
                            }
                            else{
                                return(
                                    <CloseFrame hide={props.mode === "show"} onClick={() => removeFile(index)}>
                                        <GridImage item xs={2}>
                                            <ImageFile onClick={() => downloadPDF(index)}  src={PDFLogo} alt="pdf" />
                                        </GridImage>
                                    </CloseFrame>
                                )
                            }
                        }
                        else{
                            return(
                            
                                    <GridImage item xs={2}>
                                        {
                                            renderFileStatus(file.status, index)
                                        }
                                        <OpacityLayer />
                                        <ImageFile src={LogoSherwood} width="100%" alt="Logo"/>
                                    </GridImage>
                            
                            )
                        }
                        
                    })
                }
                {
                    props.mode === "form" &&
                    
                    <Grid item xs={2}>
                        <input accept="image/*,application/pdf,application/vnd.ms-excel" id="image" name="image" style={{display:'none'}} 
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