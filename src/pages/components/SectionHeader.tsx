import { Grid, IconButton, Theme } from '@material-ui/core';
import React from 'react';
import iconImages from "../../img/icons/images_white.png";
import iconLab from "../../img/icons/lab_white.png";
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
    padding:1rem;
`;

const IconHolder = styled.div`
    padding:0.4rem 0 1rem 0rem;
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
            default:
                return null;
        }
    }
    const titlePath = alterTitle ? alterTitle : `pages.hospital.${section}.title`;
    return (
        <SectionContainer>
            
                <IconHolder>
                    {
                        renderIcon()
                    }
                </IconHolder>
        
        <div>
            <TypographyStyled variant="h3" gutterBottom display="inline">
                <Translate id={titlePath} />
            </TypographyStyled>
            {
                editCallback && 
                    <IconButton 
                    onClick={(e) => {
                        editCallback();
                    }}>

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
                    }}>
                    <IconGenerator type="info" 
                        //@ts-ignore
                        color={theme.palette.primary.color} />
                </IconButton>
            }
            
        </div>
        {
            addCallback &&
            <ButtonAdd onClick={addCallback} />
        }
    </SectionContainer>
    
    );
};

export default withTheme(SectionHeader);
