import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";
import Footer from "../components/Footer";
import { Alert } from "@material-ui/lab";
import { Translate } from 'react-localize-redux';
import { useSherwoodUser } from '../hooks';
import { spacing } from "@material-ui/system";
import { connect } from 'react-redux';
import { fetchInvestigations } from '../redux/actions/investigationsActions';
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth,
} from "@material-ui/core";
import Loader from '../components/Loader';

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 258;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children, routes, width, investigations }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const {isLoading, error} = useSherwoodUser();
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useEffect(() => {
        async function fetchRemoteInvestigations(){
            await dispatch(
                fetchInvestigations()
              );
        }
        if(!investigations.data){
            fetchRemoteInvestigations()
        }
          
    }, [])
    if(isLoading){
        return <Loader />
    }
    else if(error){
        return(
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        ) 
    }
    return (
        <Root>
            <CssBaseline />
            <GlobalStyle />
            <Drawer>
                <Hidden mdUp implementation="js">
                <Sidebar
                    routes={routes}
                    PaperProps={{ style: { width: drawerWidth } }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                />
                </Hidden>
                <Hidden smDown implementation="css">
                <Sidebar
                    routes={routes}
                    PaperProps={{ style: { width: drawerWidth } }}
                />
                </Hidden>
            </Drawer>
            <AppContent>
                <Header onDrawerToggle={handleDrawerToggle} />
                <MainContent p={isWidthUp("lg", width) ? 12 : 0}>
                {children}
                </MainContent>
                <Footer />
            </AppContent>
            
        </Root> 
  );
};

const mapDispatchToProps = dispatch => {
    return {    
        fetchInvestigations : () => dispatch(fetchInvestigations())
    }
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
    }
}
export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
