import { Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import iconImages from "../../img/icons/images_white.png";
import iconLab from "../../img/icons/lab_white.png";
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import { BiotechIcon, ButtonAdd, IconGenerator } from '../../components/general/mini_components';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

interface SectionHeaderProps {
    section:string,
    edit:boolean,
    addCallback?:() => void,
    editCallback?:()=>void,
}

const IconHolder = styled.div`
    padding-right:1rem;
    padding-left:1rem;
`;

const TypographyStyled = styled(Typography)`
    color:${props => props.theme.palette.primary.color};
`

const SectionHeader: React.FC<SectionHeaderProps> = ({ section, edit, addCallback, editCallback }) => {
   
    function renderIcon(){
        switch(section){
            case "laboratory":
                return <IconGenerator type="biotech" />
            case "medical-imaging":
                return <img src={iconImages } alt="images" width="20" />
            case "pharmacy":
                return <IconGenerator type="pharmacy" />
        }
    }
    return (
        <Grid container alignItems="center" alignContent="center" item xs={12}>
        <IconHolder>
            {
                renderIcon()
            }
        </IconHolder>
        <div>
            <TypographyStyled variant="h3" gutterBottom display="inline">
                <Translate id={`pages.hospital.${section}.title`} />
            </TypographyStyled>
            {
                editCallback && 
                    <IconButton 
                    onClick={(e) => {
                        editCallback();
                    }}>
                    <IconGenerator type={!edit ? "settings" : "back"} />
                </IconButton>
            }
            
        </div>
        {
            addCallback &&
            <ButtonAdd onClick={addCallback} />
        }
        
    </Grid>
    );
};

export default SectionHeader;
