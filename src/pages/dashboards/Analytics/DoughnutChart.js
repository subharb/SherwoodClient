import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { green, red, orange } from "@material-ui/core/colors";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { MoreVertical } from "react-feather";
import { Translate } from "react-localize-redux";
import props from "../../../theme/props";
import Loader from "../../../components/Loader";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(2)}px;
  }
`;

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;

  &:last-child th,
  &:last-child td {
    border-bottom: 0;
  }
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const ColourText = styled.span`
    color: ${(props) => props.color};
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

function DoughnutChart({ theme, title, labels, datasets, table, innerInfo }) {
  const data = {
    labels,
    datasets,
  };

  
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title={title}
      />

      <CardContent>
        <ChartWrapper>
          {
            innerInfo &&
            <DoughnutInner variant="h4">
              <Typography variant="h4">{innerInfo.value}</Typography>
              <Typography variant="caption">{innerInfo.title}</Typography>
            </DoughnutInner>
          }
          {
            props.loading &&
            <Loader />
          }
          {
            !props.loading &&
            <Doughnut data={data} options={options} />
          }
          
        </ChartWrapper>
        {
            !props.loading &&
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{table.title}</TableCell>
                  {
                    table.columns.map(col => {
                      return <TableCell align="right">{col}</TableCell>
                    })
                  }
                  <TableCell align="right"><Translate id="hospital.analytics.graphs.percentage" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  labels.map((label, index) =>{
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          { label }
                        </TableCell>
                        <TableCell align="right">{datasets[0].data[index]}</TableCell>
                        <TableCell align="right">
                          <ColourText color={datasets[0].backgroundColor[index]}>{isNaN(datasets[0].percents[index]) ? 0 : datasets[0].percents[index]}%</ColourText>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
                
                
              </TableBody>
            </Table>
          }
        
      </CardContent>
    </Card>
  );
}

export default withTheme(DoughnutChart);
