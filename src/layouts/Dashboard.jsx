import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";
import Footer from "../components/Footer";
import { Alert } from "@mui/lab";
import { Translate } from 'react-localize-redux';
import { useSherwoodUser } from '../hooks';
import { spacing } from "@mui/system";
import { connect } from 'react-redux';
import { fetchInvestigations } from '../redux/actions/investigationsActions';
import { updateLoadingRecords } from '../redux/actions/offlineActions';
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  
  Typography,
  CircularProgress,
} from "@mui/material";
import Loader from '../components/Loader';
import { LoadingOverlay } from "@material-ui/data-grid";
import { postErrorSlack } from "../utils/index.jsx";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

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

const LoadingScreen = styled.div`
  position:absolute;
  height:100%;
  width:100%;
  z-index:1301;
  opacity:0.7;
  background-color:#fff;
`;

const LoadingMessage = styled.div`
  position:absolute;
  display:flex;
  align-items: center;
  justify-content:center;
  vertical-align:center;
  height:100%;
  width:100%;
  z-index:1301;
`;
const LoadingContainer = styled.div`
    width:20rem;
    height:20rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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
  width:100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  
  flex: 1;
  background:${(props) => props.theme.palette.background.default}!important;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children, routes, width, investigations, offline }) => {
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
        try{
          //const channel = new BroadcastChannel('sw-messages');
          //console.log(channel);
          //channel.addEventListener("message", async (event) => {
            
            
          navigator.serviceWorker.addEventListener('message', async event => {
              console.log("Message received", event);
              if(event.data.hasOwnProperty("updatingRecords")){
                  console.log(event.data.updatingRecords);
                  await dispatch( 
                      updateLoadingRecords(event.data.updatingRecords)
                  );
                  if(event.data.updatingRecords === false){
                    window.location.href = window.location.origin;
                  }
              }
          }, false);
        }
        catch(error){
          //postErrorSlack("", "BroadcastChannel not available", "");
          console.log("BroadcastChannel not available");
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
    const showSidebar = (investigations.data && investigations.currentInvestigation && import.meta.env.VITE_APP_PRODUCT === 'HOSPITAL') || (import.meta.env.VITE_APP_PRODUCT !== 'HOSPITAL')
    return (
        <React.Fragment>
          {
            offline.loading &&
            <React.Fragment>
                <LoadingScreen />
                <LoadingMessage>
                  <LoadingContainer>
                      <Typography variant="subtitle1" color="textPrimary">
                          <Translate id="general.updating-records" />
                      </Typography>
                      <CircularProgress />  
                  </LoadingContainer>
                </LoadingMessage>
            </React.Fragment>
          }
            
            <Root>
                
                <CssBaseline />
                <GlobalStyle />
                <Drawer>
                    <Hidden mdUp implementation="js">
                    {
                        (showSidebar) &&
                        <Sidebar
                          routes={routes}
                          PaperProps={{ style: { width: drawerWidth } }}
                          variant="temporary"
                          investigation={investigations.currentInvestigation}
                          open={mobileOpen}
                          onClose={handleDrawerToggle}
                      />    
                    }
                    
                    </Hidden>
                    <Hidden mdDown implementation="css">
                    {
                        (showSidebar) &&
                        <Sidebar
                            routes={routes}
                            investigation={investigations.currentInvestigation}
                            PaperProps={{ style: { width: drawerWidth } }}
                        />
                    }
                    </Hidden>
                </Drawer>
                <AppContent>
                    <Header onDrawerToggle={handleDrawerToggle} />
                    <MainContent sx={{
    height: {
      xs: '30%',
      md: '100%',
    }
  }}>
                    {children}
                    </MainContent>
                    <Footer />
                </AppContent>
                
            </Root> 
          </React.Fragment>
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
        offline: state.offline
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));
