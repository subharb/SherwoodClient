import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
                                    <Typography color="primary">
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