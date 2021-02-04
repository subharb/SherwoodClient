import React, { useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

import {
  Avatar, 
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";

import { red, green, orange, yellow } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  margin-right:1rem;
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`;

export default function CardInvestigation({ image, title, description, status, shareStatus, uuid, hostResearcher, answerRequest, index }) {
    const history = useHistory();
    const chip = () => {
        switch(status){
            case 0:
                return <Chip label="Draft" rgbcolor={yellow[500]} />
            case 1:
                return <Chip label="Live" rgbcolor={green[500]} />
            default:
                return <Chip label="Draft" rgbcolor={yellow[500]} />
        }
        
    }
    const chipStatus = () => {
        if(shareStatus === 0){
            return <Chip label="Pending" rgbcolor={orange[500]} />
        }
        else{
            return null;
        }
        
    }
    
    function renderCardActions(){
        if(shareStatus === 0){
            return(
                <CardActions>
                    <Button data-testid="deny" size="small" color="primary" onClick={() =>answerRequest(index, 1)}>
                        Deny
                    </Button>
                    <Button data-testid="accept" size="small" color="secondary" onClick={() => answerRequest(index, 2)}>
                        Accept
                    </Button>
                </CardActions>
                
            )
        }
        else{
            return(
                <CardActions>
                    <NavLink to={`/investigation/share/${uuid}`} >
                        <Button data-testid="share" size="small" color="primary">
                            Share
                        </Button>
                    </NavLink>
                    <NavLink to={`/investigation/show/${uuid}`}>
                        <Button data-testid="open" size="small" color="secondary">
                        Open
                        </Button>
                    </NavLink>
                </CardActions>
                
            )
        }
    }
    return (
        <Card className="investigation" mb={6}>
        {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
        <CardContent>
            <Grid container>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {chip()}
                    {chipStatus()}
                </Grid>
                {
                shareStatus === 0 && 
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Shared with you by: {hostResearcher.name} {hostResearcher.surnames}
                        </Typography>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography mb={4} component="p" dangerouslySetInnerHTML={{__html:description}} />
                </Grid>
            </Grid>            
            {/* <AvatarGroup max={3}>
                <Avatar alt="Avatar" src="/static/img/avatars/avatar-1.jpg" />
                <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
                <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
            </AvatarGroup> */}
        </CardContent>
        {
            renderCardActions()
        }
        </Card>
    );
}
