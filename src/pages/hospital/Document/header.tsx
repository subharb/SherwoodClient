import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";
import { EnhancedTable } from "../../../components/general/EnhancedTable";

import { formatPatients } from "../../../utils";
import { BillingInfo } from "../Billing/types";


interface Props extends Omit<BillingInfo, 'id'>{
    size:"A4" | "ticket",
 
}
export const HeaderDocument:React.FC<Props> = (props) => {
    
    if(props.size === "A4"){
        return(
            <Grid container xs={12} style={{paddingBottom:'2rem'}}>
                <Grid xs={6} item style={{textAlign:'center'}}>
                    <img width="200" src={props.logoBlob} alt={props.hospitalName} />
                </Grid>    
                <Grid xs={6} style={{textAlign:'right'}}>
                    <Grid>
                        <Typography variant="body2">{props.hospitalName}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2">{props.address}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body2">{props.phone}</Typography>
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
