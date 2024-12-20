import React from "react";
import styled from "styled-components";

import {
  Box,
  Card,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@mui/material";

import { rgba } from "polished";

import { spacing } from "@mui/system";

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};

  span {
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const Percentage = styled(MuiTypography)`
  span {
    color: ${(props) => props.percentagecolor};
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    background: ${(props) => rgba(props.percentagecolor, 0.1)};
    padding: 2px;
    border-radius: 3px;
    margin-right: ${(props) => props.theme.spacing(2)};
  }
`;

const Stats = ({ title, amount, chip, percentageText, percentagecolor }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={6}>
          {title}
        </Typography>
        <Typography variant="h3" mb={6}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Percentage
          variant="subtitle2"
          mb={6}
          color="textSecondary"
          percentagecolor={percentagecolor}
        >
          <span>{percentageText}</span> Since last week
        </Percentage>
        <Chip label={chip} />
      </CardContent>
    </Card>
  );
};

export default Stats;
