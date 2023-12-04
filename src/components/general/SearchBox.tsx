import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { ChipContainer } from '../../pages/hospital/Service/RequestInfo';
import { orange, red } from '@mui/material/colors';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { ColourChip } from './mini_components-ts';

export interface FilterItem{
    label:string, 
    value:number, 
    selected:boolean, 
    icon?: JSX.Element, 
    color:string, callBack:() => void
}

interface SearchBoxProps extends LocalizeContextProps{
    selectFilter?:{
        value: string;
        icon?: JSX.Element;
        options :  { value: string; label: string; }[],
        callBack:(value:string) => void;
    }
    filterItems:FilterItem[],
    textField:{
        label:string,
        callBack:(value:string) => void;
    }    
}

const SearchBox: React.FC<SearchBoxProps> = ({ filterItems, selectFilter, translate, textField }) => {
    return (
        <>
            <Grid item xs={12}>
                <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid item xs={6}>
                                <TextField fullWidth onChange={(event) => textField.callBack(event.target.value)} variant="outlined" label={translate(textField.label)} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container alignItems='center'>
                            <Grid item zeroMinWidth>
                                <Typography variant="body2" component="span"><Translate id="hospital.search_box.filter" /></Typography>:
                                {
                                    filterItems.map((item) => {
                                        
                                        return(<ChipContainer>
                                                    <ColourChip rgbcolor={item.color} active={!item.selected} 
                                                        avatar={item.icon}
                                                        onClick={item.callBack} label={translate(`hospital.search_box.filters.${item.label}`)}/>
                                                </ChipContainer>);
                                    })
                                }
                            </Grid>
                            {
                                selectFilter &&
                                <Grid xs={4} item  >
                                    <div style={{paddingLeft:'1rem'}}>
                                        <FormControl fullWidth variant="outlined" margin="dense"  >
                                            <InputLabel id="provider">{selectFilter.value ? selectFilter.value : "Provider"}</InputLabel>
                                                <Select
                                                    labelId="provider"
                                                    id="provider"
                                                    label={selectFilter.value}
                                                    onChange={(event) => selectFilter.callBack(event.target.value as string)}
                                                >
                                                { selectFilter.options.map((option) => {
                                                    return <MenuItem value={option.value}>{option.label}</MenuItem>
                                                }) }
                                                </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
};

export default withLocalize(SearchBox);
