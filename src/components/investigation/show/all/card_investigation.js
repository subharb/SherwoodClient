import React from "react";
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
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`;

export default function CardInvestigation({ image, title, description, status, url, shareStatus }) {
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
        switch(shareStatus){
            case 0:
                return <Chip label="Pending" rgbcolor={orange[500]} />
            case 1:
                return <Chip label="Denied" rgbcolor={red[500]} />
            default:
                return <Chip label="Accepted" rgbcolor={green[500]} />
        }
        
    }
    function renderCardActions(){
        if(shareStatus === 0){
            return(
                <CardActions>
                    <Button size="small" color="primary">
                        Deny
                    </Button>
                    <Button data-testid="open" size="small" color="primary">
                        Accept
                    </Button>
                </CardActions>
                
            )
        }
        else{
            return(
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <NavLink to={url}>
                        <Button data-testid="open" size="small" color="primary">
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
            <Typography gutterBottom variant="h5" component="h2">
            {title}
            </Typography>

            {chip()}
            {chipStatus()}
            <Typography mb={4} component="p" dangerouslySetInnerHTML={{__html:description}}>
                
            </Typography>

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
