import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react"
import { BillingInfo } from "../Billing/types";
import { dateToFullDateString } from "../../../utils";


interface Props extends Omit<BillingInfo, 'id' |  'billables' | 'params' | 'currency'>{
    size:"A4" | "ticket",
    locale:string
 
}
export const HeaderDocument:React.FC<Props> = (props) => {
    
    if(props.size === "A4"){
        return(
            <Grid container xs={12}>
                <Grid xs={6} item style={{textAlign:'center'}}>
                    <img width="200" src={props.logoBlob} alt={props.hospitalName}/>
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
                    <Grid style={{paddingTop:'2rem'}}>
                        <Typography variant="body2">{props.city}, {dateToFullDateString(new Date(), props.locale)}</Typography>
                    </Grid>
                </Grid>   
            </Grid>
            
        ) 
    }
    else{
        return null;
    }
}
