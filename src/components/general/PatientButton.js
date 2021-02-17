import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import icon_male from "../../img/icon_male.svg";
import icon_female from "../../img/icon_female.svg";
import styled from 'styled-components';

const Container = styled.div`
    width:7rem;
    height:7rem;
    background: #FFFFFF;
    border: 2px solid #6F6C6D;
    box-sizing: border-box;
    border-radius: 15px;
    cursor:pointer;
`;
const TypographyColorGender = styled(Typography)`
    color:${props => props.gender === "female" ? "#EE6658" : "#008187"}
`;
export default function PatientButton(props) {
    return (
        <Container onClick={props.onClick}>
            <Grid container xs={12}>
                <Grid item xs={4}>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.number}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        {
                            props.gender === "male" &&
                            <img src={icon_male} alt="male" />
                        }
                        {
                            props.gender === "female" &&
                            <img src={icon_female} alt="female" />
                        }
                    </Grid>
                </Grid>
                <Grid item xs={8} >
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.name} {props.surnames}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.id}
                        </Typography>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center"}}>
                        <TypographyColorGender variant="body2" gutterBottom gender={props.gender}>
                            {props.age}
                        </TypographyColorGender>
                    </Grid>
                    <Grid xs={12} style={{textAlign:"center", color:"green"}}>
                        <Typography variant="body2" gutterBottom>
                            {props.days}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

// /* Group 15 */

// position: absolute;
// width: 110px;
// height: 110px;
// left: 12px;
// top: 192px;



// /* Rectangle 8 */

// position: absolute;
// width: 110px;
// height: 110px;
// left: 12px;
// top: 192px;

// background: #FFFFFF;
// border: 2px solid #6F6C6D;
// box-sizing: border-box;
// border-radius: 15px;


// /* g6008 */

// position: absolute;
// left: 5.6%;
// right: 87.2%;
// top: 24.21%;
// bottom: 70.77%;

// transform: matrix(1, 0, 0, -1, 0, 0);


// /* g5704 */

// position: absolute;
// left: 6.21%;
// right: 87.94%;
// top: 20.61%;
// bottom: 77.99%;

// transform: matrix(1, 0, 0, -1, 0, 0);


// /* path5706 */

// position: absolute;
// left: 6.21%;
// right: 87.94%;
// top: 20.61%;
// bottom: 77.99%;

// background: #008187;
// transform: matrix(1, 0, 0, -1, 0, 0);


// /* g5708 */

// position: absolute;
// left: 5.6%;
// right: 87.2%;
// top: 24.21%;
// bottom: 72.32%;

// transform: matrix(1, 0, 0, -1, 0, 0);


// /* path5710 */

// position: absolute;
// left: 5.6%;
// right: 87.2%;
// top: 24.21%;
// bottom: 72.32%;

// background: #008187;
// transform: matrix(1, 0, 0, -1, 0, 0);


// /* Age (years) */

// position: absolute;
// width: 55px;
// height: 12px;
// left: 58px;
// top: 240px;

// font-family: Montserrat;
// font-style: normal;
// font-weight: 500;
// font-size: 10px;
// line-height: 12px;
// letter-spacing: -0.015em;

// color: #006AC7;



// /* Stay (days) */

// position: absolute;
// width: 53px;
// height: 12px;
// left: 58px;
// top: 260px;

// font-family: Montserrat;
// font-style: normal;
// font-weight: 500;
// font-size: 10px;
// line-height: 12px;
// letter-spacing: -0.015em;

// color: #00B848;



// /* Group 11 */

// position: absolute;
// width: 89px;
// height: 22px;
// left: 19px;
// top: 201px;



// /* Full name */

// position: absolute;
// width: 50px;
// height: 12px;
// left: 58px;
// top: 201px;

// font-family: Montserrat;
// font-style: normal;
// font-weight: 500;
// font-size: 10px;
// line-height: 12px;
// letter-spacing: -0.015em;

// color: #000000;



// /* BED */

// position: absolute;
// width: 32px;
// height: 17px;
// left: 19px;
// top: 204px;

// font-family: Montserrat;
// font-style: normal;
// font-weight: bold;
// font-size: 14px;
// line-height: 17px;
// /* identical to box height */
// letter-spacing: -0.015em;

// color: #6F6C6D;



// /* ID: xxxxxx */

// position: absolute;
// width: 38px;
// height: 10px;
// left: 58px;
// top: 213px;

// font-family: Montserrat;
// font-style: normal;
// font-weight: normal;
// font-size: 8px;
// line-height: 10px;
// /* identical to box height */
// letter-spacing: -0.015em;

// color: #4B494A;

