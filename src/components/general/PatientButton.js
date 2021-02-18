import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { IconPatient } from './mini_components'
import styled from 'styled-components';

const Container = styled.div`
    width:7rem;
    height:7rem;
    background: #FFFFFF;
    border: 2px solid #6F6C6D;
    box-sizing: border-box;
    border-radius: 15px;
    cursor:pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
`;
const TypographyColorGender = styled(Typography)`
    color:${props => props.gender === "female" ? "#EE6658" : "#008187"}
`;

const TypographyFree = styled(Typography)`
    color:green;
`;
export default function PatientButton(props) {
    if(!props.name){
        return (
            <Container onClick={props.onClick}>
                <TypographyFree variant="body2" gutterBottom>
                    FREE
                </TypographyFree>
            </Container>
        )
    }
    return (
        <Container onClick={props.onClick}>
            <Grid container xs={12}>
                <Grid item xs={4}>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.number}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <IconPatient gender={props.gender} />
                    </Grid>
                </Grid>
                <Grid item xs={8} >
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.name} {props.surnames}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.id}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <TypographyColorGender variant="body2" gutterBottom gender={props.gender}>
                            {props.age}
                        </TypographyColorGender>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center", color:"green"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.stay}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
