import React from "react";
import styled from "styled-components";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import { withLocalize } from "react-localize-redux";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;

function LanguagesDropdown(props) {
  const [anchorMenu, setAnchorMenu] = React.useState(null);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

    function selectLanguage(lang){
        props.setActiveLanguage(lang);
        localStorage.setItem("language", lang); 
        closeMenu();
    }
    function renderCurrentLanguage(){
        switch(props.activeLanguage.code){
            case "fr":
                return <Flag src="/static/img/flags/fr.png" alt="Français" />
            case "es":
                return <Flag src="/static/img/flags/es.png" alt="Español" />
            default:
                return <Flag src="/static/img/flags/en.png" alt="English" />
        }
        
    }
  return (
    <React.Fragment>
      <Tooltip title="Languages">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large">
        {
            renderCurrentLanguage()
        }
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => selectLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => selectLanguage("es")}>Español</MenuItem>
        <MenuItem onClick={() => selectLanguage("fr")}>Français</MenuItem>
        {/* <MenuItem onClick={closeMenu}>German</MenuItem>
        <MenuItem onClick={closeMenu}>Dutch</MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}

export default withLocalize(LanguagesDropdown);
