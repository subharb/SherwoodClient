import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { green, red } from "@mui/material/colors";

import {
  Avatar as MuiAvatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover as MuiPopover,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { Bell, Home, UserPlus, Server } from "react-feather";
import { Translate } from "react-localize-redux";
import { Update } from "@mui/icons-material";

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${(props) => props.theme.shadows[1]};
    border: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Avatar = styled(MuiAvatar)`
  background: #000;
`;

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

function Notification({ title, description, Icon }) {
  return (
    <ListItem divider component={Link} to="#">
      <ListItemAvatar>
        <Avatar>
          <SvgIcon fontSize="small">
            <Icon />
          </SvgIcon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textPrimary",
        }}
        secondary={description}
      />
    </ListItem>
  );
}

function NotificationsDropdown(props) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function currentIcon(){
    if(props.offline){
        return(
          <OfflineBoltIcon style={props.isOffline ? { color: red[500] } : { color: green[500] } }  /> 
        )
    }
    else{
        return <Bell />
    }
    
  }
  function renderNotifications(){
 
      return props.notifications.map(notification => {
            return(
                <Notification 
                  title={notification.title}
                  description={notification.description}
                  Icon={Server}
                />
            );
          } ) 
  }
 
  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen} size="large">
          <Indicator badgeContent={props.notifications.length}>
             { currentIcon() }
          </Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <NotificationHeader p={2}>
            <Typography variant="subtitle1" color="textPrimary">
              {props.notifications.length} New Notifications
            </Typography>
          
        </NotificationHeader>
        <React.Fragment>
            <List disablePadding>
                { renderNotifications()}
            </List>
            { props.notifications.length > 0 &&
                <Box p={1} display="flex" justifyContent="center">
                    <button onClick={props.resendCallback}>Resend</button>    
                </Box>
            }
            
          {/* <Box p={1} display="flex" justifyContent="center">
            {
              props.isOffline &&
              <Translate id="general.offline.description" />
            }
            {
              (!props.isOffline && props.notifications.length > 0) &&
              <Translate id="general.offline-update.description" />
            }
          </Box> */}
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default NotificationsDropdown;
