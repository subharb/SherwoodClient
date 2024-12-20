import React from "react";
import styled, { withTheme } from "styled-components";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import OfflineDropDown from './OfflineDropDown'
import {
  Grid,
  Hidden,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@mui/material";

import { Menu as MenuIcon, Slideshow } from "@mui/icons-material";

import NotificationsDropdown from "./NotificationsDropdown";
import MessagesDropdown from "./MessagesDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import UserDropdown from "./UserDropdown";
import DataSensor from "./DataSensor";

const AppBar = styled(MuiAppBar)`
  background:${(props) => props.theme.header.background}!important;
  color: ${(props) => props.theme.header.color}!important;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;
  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const AppBarComponent = ({ onDrawerToggle }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                data-testid="menu-hamburguer"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs />
          <Grid item>
                <a style={{color:"#000"}} href="https://www.sherwood.science/tutorial" target="blank">
                    <IconButton color="inherit" >
                        <Slideshow />
                    </IconButton>                
                </a>                    
                <DataSensor />
                <OfflineDropDown />
                <LanguagesDropdown />
                <UserDropdown />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withTheme(AppBarComponent);
