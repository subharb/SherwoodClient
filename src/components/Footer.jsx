import React from "react";
import styled from "styled-components";

import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
} from "@mui/material";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};
  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden mdDown>
          <Grid container item xs={12} md={6}>
            <List>
              <ListItem button={true} component="a" href="mailto:pedro@sherwood.science">
                <ListItemText primary="Support" />
              </ListItem>
              {/* <ListItem button={true} component="a" href="#">
                <ListItemText primary="Help Center" />
              </ListItem>
              <ListItem button={true} component="a" href="#">
                <ListItemText primary="Privacy" />
              </ListItem>
              <ListItem button={true} component="a" href="#">
                <ListItemText primary="Terms of Service" />
              </ListItem> */}
            </List>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={6} justifyContent="flex-end">
          <List>
            <ListItem button={true}>
              <ListItemText
                primary={`© ${new Date().getFullYear()} - Sherwood Hospital v3.11.2`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
