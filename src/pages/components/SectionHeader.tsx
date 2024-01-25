import { Grid, IconButton, Theme } from '@mui/material';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Translate } from 'react-localize-redux';
import { ButtonAdd, IconGenerator, TypographyStyled } from '../../components/general/mini_components';

interface SectionHeaderProps {
    theme:Theme,
    section:string,
    edit:boolean,
    alterTitle?:string,
    addCallback?:() => void,
    editCallback?:()=>void,
    infoCallback?:()=>void,
}

const SectionContainer = styled.div`
    display:flex;
    xpadding:1rem;
`;

const IconHolder = styled.div`
    padding:0rem 0.5rem;
`;

const SectionHeader: React.FC<SectionHeaderProps> = ({ section, edit,alterTitle, theme, addCallback, editCallback, infoCallback }) => {
   
    function renderIcon(){
        switch(section){
            case "laboratory":
                return <IconGenerator type="biotech" color={theme.palette.secondary.main} />
            case "medical-imaging":
                return <IconGenerator type="image" />
            case "pharmacy":
                return <IconGenerator type="pharmacy" />
            case "agenda":
            case "outpatients":
                return <IconGenerator type="outpatients" />
            case "shoe_shop":
                return <IconGenerator type="shoe_shop" />
            case "analytics":
                return <IconGenerator type="analytics" />
            case "billing":
                return <IconGenerator type="billing" />
            default:
                return null;
        }
    }
    const titlePath = alterTitle ? alterTitle : `pages.hospital.${section}.title`;
    return (
        <SectionContainer>
            <Grid container alignItems="center" >
                <Grid item>
                <IconHolder>
                {
                    renderIcon()
                }
                </IconHolder>
                </Grid>
                <Grid item>
                    <TypographyStyled variant="h3" gutterBottom display="inline">
                        <Translate id={titlePath} />
                    </TypographyStyled>
                </Grid>
                {
                editCallback && 
                    <IconButton
                        onClick={(e) => {
                            editCallback();
                        }}
                        size="large">

                    <IconGenerator type={!edit ? "settings" : "back"}  
                        //@ts-ignore
                        color={theme.palette.primary.color} />
                </IconButton>
            }
            {
                infoCallback && 
                    <IconButton
                        onClick={(e) => {
                            infoCallback();
                        }}
                        size="large">
                    <IconGenerator type="info" 
                        //@ts-ignore
                        color={theme.palette.primary.color} />
                </IconButton>
            }
            {
                addCallback &&
                <ButtonAdd onClick={addCallback} />
            }
        </Grid>
    </SectionContainer>
    );
};

export default withTheme(SectionHeader);
