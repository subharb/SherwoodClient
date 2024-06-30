import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import { ButtonAccept } from '../mini_components';

interface Props{
    callbackOffline : (text:string) => void,
    error : boolean,
    label : string,
    variant:"standard" | "filled" | "outlined" | undefined
}
export const OfflineField:React.FC<Props> = (props) => {
    const [text, setText] = useState("");
    const [saved, setSaved] = useState(false);

    function saveField(){
        props.callbackOffline(text);
        setSaved(true);
    }
    return( 
        <Grid container spacing={2}>
            <Grid item>
                <TextField label={props.label } error={props.error} value={text} variant="outlined" onChange={ (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setText(e.target.value)} />
            </Grid>
            {
                !saved && 
                <Grid item>
                    <ButtonAccept color="secondary" onClick={saveField}><Translate id="general.add" /></ButtonAccept>
                </Grid>
            }
        </Grid>
    );
}