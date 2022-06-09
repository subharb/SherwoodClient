import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import { IPatient } from "../../../constants/types";
import { formatPatients } from "../../../utils";
import { HeaderDocument } from "./header";


interface Props{
    size:"A4" | "ticket",
    imageUrl:string,
    address:string,
    telephone:string,
    email:string
}
export const Document:React.FC<Props> = (props) => {
    if(props.size === "A4"){
        return(
            <Grid container xs={12} style={{width:"3508px"}}>
                <Grid item xs={12} alignItems="flex-end">
                    Print
                </Grid>
                <HeaderDocument size={props.size} imageUrl={props.imageUrl} 
                    telephone={props.telephone} address={props.address} email={props.email} 
                    />
                {
                    props.children
                }
            </Grid>
            
        )
    }
    else{
        return null;
    }
}
