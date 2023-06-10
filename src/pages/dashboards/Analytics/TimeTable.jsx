import React from "react";
import styled from "styled-components";

import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@material-ui/icons";

import { red, green } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";
import Actions from "./Actions";
import Loader from "../../../components/Loader";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
function createData(source, users, sessions, bounce, avg) {
  id += 1;
  return { id, source, users, sessions, bounce, avg };
}

const rows = [
  createData(
    "Google",
    "1023",
    "1265",
    <Chip label="30%" rgbcolor={green[500]} />,
    "00:06:25"
  ),
  createData(
    "Direct",
    "872",
    "1077",
    <Chip label="63%" rgbcolor={red[500]} />,
    "00:09:18"
  ),
  createData(
    "Twitter",
    "812",
    "1003",
    <Chip label="28%" rgbcolor={green[500]} />,
    "00:05:56"
  ),
  createData(
    "GitHub",
    "713",
    "881",
    <Chip label="22%" rgbcolor={green[500]} />,
    "00:06:19"
  ),
  createData(
    "DuckDuckGo",
    "693",
    "856",
    <Chip label="56%" rgbcolor={red[500]} />,
    "00:09:12"
  ),
  createData(
    "Facebook",
    "623",
    "770",
    <Chip label="20%" rgbcolor={green[500]} />,
    "00:04:42"
  ),
];

function TimeTable(props){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    console.log("Close");
    setAnchorEl(null);
    if(value !== false){
      props.actionCallBack(value);
    }
    
  };
  function renderHeader(){
    if(props.data.length === 0){
       return null;
    }
    else{
        return props.header.map((header, index)=> {
          if(index === 0){
            return <TableCell style={{fontSize:'1.1rem'}}>{header}</TableCell>
          }
          else{
              return <TableCell style={{fontSize:'1.1rem'}} align="right">{header}</TableCell>
          }
        })
      }
  }
  function renderBodyTable(){
    if(props.data.length === 0){
      return <TableRow><TableCell>No data available</TableCell></TableRow>
    }
    else{
      return props.data.map((row, index) => (
        <TableRow key={index}>
            {
              row.map((element, index) =>{
                if(index === 0){
                    return <TableCell component="th" scope="row">{element}</TableCell>
                }
                else{
                    return <TableCell align="right">{element}</TableCell>
                }
              })
            }
        </TableRow>
      ))
    }
    
  }
  return(
      <Card mb={3}>
          <CardHeader
            
            action={
              <React.Fragment>
              <IconButton aria-label="settings" aria-owns={anchorEl ? "simple-menu" : undefined} onClick={handleClick}>
                <FilterListIcon />
              </IconButton>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose(false)}
                >
                  <MenuItem onClick={() => handleClose(0)}>Today</MenuItem>
                  <MenuItem onClick={() => handleClose(1)}>Yesterday</MenuItem>
                  <MenuItem onClick={() => handleClose(2)}>Last 7 days</MenuItem>
                  <MenuItem onClick={() => handleClose(3)}>Last 30 days</MenuItem>
                  <MenuItem onClick={() => handleClose(4)}>This month</MenuItem>
                  <MenuItem onClick={() => handleClose(5)}>Last month</MenuItem>
              </Menu>
              </React.Fragment>
            }
            title={<Typography variant="h5"  style={{fontSize:'1.2rem'}}>{props.title}</Typography> }
          />

          <Paper>
            {
              props.loading &&
              <Loader />
            }
            {
              !props.loading &&
              <TableWrapper>

                <Table>
                  <TableHead>
                    <TableRow>
                      { renderHeader()}
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderBodyTable()}
                  </TableBody>
                </Table>
            </TableWrapper>
            }
            
        </Paper>
        
        
      </Card>
  )}

export default TimeTable;
