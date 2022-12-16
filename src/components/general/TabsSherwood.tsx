import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { string } from 'prop-types';
import React, { useState } from 'react';
import { ButtonAdd, ButtonSave } from './mini_components';
import { LocalizeContextProps, LocalizedElement, LocalizedElementMap, Translate, withLocalize } from 'react-localize-redux';
import {TextFieldSherwood} from "./FieldSherwood";
import styled from 'styled-components';


interface ITabPanel extends React.ReactElement{
    label:string
}
interface Props extends LocalizeContextProps{
    defaultTab:number,
    children: ITabPanel[]
}

const BoxTabs = styled(Box)`
    color:${props => props.theme.palette.primary.color};
`;

function a11yProps(index:number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const TabsSherwood:React.FC<Props> = (props) => {
    const [tabSelector, setTabSelector] = useState(props.defaultTab ? props.defaultTab : 0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue:any) => {
        setTabSelector(newValue);
    };
    return(
        <React.Fragment>
            <BoxTabs>
                <Tabs value={tabSelector} onChange={handleChange} variant="scrollable"
                    scrollButtons="auto" aria-label="basic tabs example">
                    {
                        props.children.map((child, index) => {
                            return <Tab label={child.props.label} {...a11yProps(index)} />
                        })
                    }
                </Tabs>
            </BoxTabs>
            {
                props.children.map((child, index) => {
                    return(
                        <TabPanel value={tabSelector} index={index}>
                            {child}
                        </TabPanel>
                    )
                })
            }            
        </React.Fragment>
    )
}
export default withLocalize(TabsSherwood);