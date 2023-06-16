import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import makeStyles from '@mui/styles/makeStyles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Breadcrumb(props){
    
        const classes = useStyles();
        return (
            <div className={classes.root}>
                
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {
                        props.stages.map((stage, index) => {
                            if(index === props.selected){
                                return(
                                    <Typography style={{fontWeight:'bold', color:'#49CEBF'}}>
                                        {stage}
                                    </Typography>
                                )
                            }
                            else{
                                return(
                                    <Link color="textPrimary" onClick={props.callBack}>
                                        {stage}
                                    </Link>
                                )
                            }
                            
                        })
                    }
              </Breadcrumbs>
            </div>
          );

    
}
Breadcrumb.propTypes = {
    stages: PropTypes.array,
    selected:PropTypes.number,
    callBack:PropTypes.func
}