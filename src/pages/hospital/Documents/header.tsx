import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils";


interface Props{
    size:"A4" | "ticket",
    imageUrl:string,
    address:string,
    telephone:string,
    email:string
}
export const HeaderDocument:React.FC<Props> = (props) => {
    if(props.size === "A4"){
        return(
            <Grid container xs={12} style={{width:"3508px", border:'1px red solid'}}>
                <Grid item style={{textAlign:'center', maxWidth:'300px'}}>
                    <Grid >
                        <img src={props.imageUrl} width="80" alt="logo" />
                    </Grid>
                    <Grid>
                        <Typography variant="body2">{props.address}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2">{props.telephone}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2">{props.email}</Typography>
                    </Grid>
                </Grid>   
                
            </Grid>
            
        )
    }
    else{
        return null;
    }
}
