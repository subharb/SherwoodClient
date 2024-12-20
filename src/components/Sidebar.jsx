import React, { useState } from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { NavLink, withRouter } from "react-router-dom";
import { darken } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";
import pathLogo from '../img/logo_sherwood_web.png';
import { spacing } from "@mui/system";
import { useDepartments, useProfileInfo } from '../hooks';
import { getData } from '../utils/index.jsx';
import {
    Badge,
    Box as MuiBox,
    Chip,
    Grid,
    Avatar,
    Collapse,
    Drawer as MuiDrawer,
    List as MuiList,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { green } from "@mui/material/colors";


import { sidebarRoutes as routes } from "../routes/index";
import { sidebarRoutesHospital as routesHospital } from "../routes/index";


import { useSelector } from "react-redux";
import { FUNCTIONALITY } from "../constants/types";

const Logo = styled.img``;
const LinkNoDecoration = styled(NavLink)`
    text-decoration:none;
`;
const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;
`;

const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-left: 2px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)};
    padding-right: ${(props) => props.theme.spacing(1.375)};
  }
`;

const Category = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)};
  padding-bottom: ${(props) => props.theme.spacing(3)};
  padding-left: ${(props) => props.theme.spacing(8)};
  padding-right: ${(props) => props.theme.spacing(7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
        darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${(props) => props.theme.spacing(17.5)};
  padding-top: ${(props) => props.theme.spacing(2)};
  padding-bottom: ${(props) => props.theme.spacing(2)};

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &:hover {
    background-color: ${(props) =>
        darken(0.015, props.theme.sidebar.background)};
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
        darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(4)}px
    ${(props) => props.theme.spacing(7)}px
    ${(props) => props.theme.spacing(1)};
  opacity: 0.9;
  display: block;
`;

const SidebarFooter = styled.div`
  background-color: ${(props) =>
        props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}px
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const SidebarFooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const SidebarFooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
        props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarCategory = ({
    name,
    icon,
    classes,
    isOpen,
    isCollapsable,
    badge,
    ...rest
}) => {
    return (
        <Category {...rest}>
            {icon}
            <CategoryText data-testid={name}>{name}</CategoryText>
            {isCollapsable ? (
                isOpen ? (
                    <CategoryIconMore />
                ) : (
                    <CategoryIconLess />
                )
            ) : null}
            {badge ? <CategoryBadge label={badge} /> : ""}
        </Category>
    );
};

const SidebarLink = ({ name, to, badge, icon }) => {
    return (
        <Link
            button
            dense
            component={NavLink}
            exact
            data-testid={name}
            to={to}
            activeClassName="active"
        >
            <LinkText>{name}</LinkText>
            {badge ? <LinkBadge label={badge} /> : ""}
        </Link>
    );
};

const Sidebar = ({ classes, staticContext, location, investigation, ...rest }) => {
    const investigations = useSelector((state) => state.investigations);
    const { profile } = useProfileInfo();
    const billingInfo = investigations.currentInvestigation ? investigations.currentInvestigation.billingInfo : null;
    
    const initOpenRoutes = () => {
        /* Open collapse element that matches current url */
        const pathName = location.pathname;

        let _routes = {};

        routes.forEach((route, index) => {
            const isActive = pathName.indexOf(route.path) === 0;
            const isOpen = route.open;
            const isHome = route.containsHome && pathName === "/";

            _routes = Object.assign({}, _routes, {
                [index]: isActive || isOpen || isHome,
            });
        });

        return _routes;
    };

    const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());
    const renderCategory = (category, index, openRoutes) => {
        const hasCategory = import.meta.env.VITE_APP_PRODUCT !== 'HOSPITAL' ? true : profile === null || !category.categoryDepartment ? false : profile.units.filter((unit) => category.categoryDepartment.includes(unit.department.type)).length > 0;
        const hasPermission = import.meta.env.VITE_APP_PRODUCT !== 'HOSPITAL' ? true : investigation.permissions.filter(value => category.permissions.includes(value)).length > 0;
        const hasFunctionality = import.meta.env.VITE_APP_PRODUCT !== 'HOSPITAL' ? true : investigation.functionalities.filter(value => category.functionalities.includes(value)).length > 0;
        
        if ((category.permissions.length === 0 || hasPermission) && 
            (category.functionalities.length === 0 || hasFunctionality) && 
            ((!category.categoryDepartment) || hasCategory)) 
            return category.children && category.icon ? (
                <React.Fragment key={index}>
                    <SidebarCategory
                        isOpen={!openRoutes[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => toggle(index)}
                    />

                    <Collapse
                        in={openRoutes[index]}
                        timeout="auto"
                        unmountOnExit
                    >
                        {category.children.map((route, index) => (
                            <SidebarLink
                                key={index}
                                name={route.name}
                                to={route.path}
                                icon={route.icon}
                                badge={route.badge}
                            />
                        ))}
                    </Collapse>
                </React.Fragment>
            ) : category.icon ? (
                <SidebarCategory
                    isCollapsable={false}
                    name={category.id}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    button
                    badge={category.badge}
                />
            ) : null
    }
    function renderLogo(){
        const hasAesthetics = import.meta.env.VITE_APP_PRODUCT !== 'HOSPITAL' ? true : investigation.functionalities.includes(FUNCTIONALITY.AESTHETICS);
        if(billingInfo && hasAesthetics){
            return <img src={billingInfo.logoBlob} alt={investigations.currentInvestigation.name} height="55" /> 
        }
        else{
            return <img src={pathLogo} alt="Sherwood Science" height="55" /> 
        }
    }
    const toggle = (index) => {
        // Collapse all elements
        Object.keys(openRoutes).forEach(
            (item) =>
                openRoutes[index] ||
                setOpenRoutes((openRoutes) =>
                    Object.assign({}, openRoutes, { [item]: false })
                )
        );

        // Toggle selected element
        setOpenRoutes((openRoutes) =>
            Object.assign({}, openRoutes, { [index]: !openRoutes[index] })
        );
    };
    let appRoutes = routes;
    if (import.meta.env.VITE_APP_PRODUCT === "HOSPITAL") {
        appRoutes = routesHospital;
    }
    return (
        <Drawer variant="permanent" {...rest}>
            <Brand component={NavLink} to="/" button>
                <Box ml={1} pt={6}>
                    {
                        renderLogo()
                    }
                </Box>
            </Brand>
            <Scrollbar>
                <List disablePadding>
                    <Items>
                        {appRoutes.map((category, index) => (
                            <React.Fragment key={index}>
                                {category.header ? (
                                    <SidebarSection>{category.header}</SidebarSection>
                                ) : null}

                                {renderCategory(category, index, openRoutes)}
                            </React.Fragment>
                        ))}
                    </Items>
                </List>
            </Scrollbar>
            <SidebarFooter>
                <Grid container spacing={2}>
                    <Grid item>
                        <SidebarFooterBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot"
                        >
                            <Avatar
                                alt="Lucy Lavender"
                                src="/static/img/avatars/avatar-1.jpg"
                            />
                        </SidebarFooterBadge>
                    </Grid>
                    <Grid item>
                        <SidebarFooterText variant="body2">{getData("name") + " " + getData("surnames")}</SidebarFooterText>
                        {/* <SidebarFooterSubText variant="caption">
                        UX Designer
                    </SidebarFooterSubText> */}
                    </Grid>
                </Grid>
            </SidebarFooter>
        </Drawer>
    );
};

export default withRouter(Sidebar);
