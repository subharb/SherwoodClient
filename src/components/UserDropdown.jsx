import React, { useEffect } from "react";
import styled from "styled-components";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    Tooltip,
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
} from "@mui/material";

import { signOut } from "../redux/actions/authActions";

const IconButton = styled(MuiIconButton)`
    svg {
        width: 22px;
        height: 22px;
    }
`;



function UserDropdown() {
    const [anchorMenu, setAnchorMenu] = React.useState(null);
    const history = useHistory();
    const dispatch = useDispatch();


    const toggleMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorMenu(null);
    };

    const handleSignOut = async () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("indexHospital");
        history.push("/auth/sign-in");
        dispatch(signOut());
    };



    return (
        <React.Fragment>
            <Tooltip data-testid="account" title="Account">
                <IconButton
                    aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    size="large">
                    <Power />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={Boolean(anchorMenu)}
                onClose={closeMenu}
            >
                {<MenuItem onClick={closeMenu}>Profile</MenuItem>}
                <MenuItem data-testid="log_out" onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default UserDropdown;
