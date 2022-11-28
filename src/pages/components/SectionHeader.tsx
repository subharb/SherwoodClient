import { Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import iconImages from "../../img/icons/images_white.png";
import iconLab from "../../img/icons/lab_white.png";
import { ServiceType } from '../hospital/Service/types';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import { ButtonAdd, IconGenerator } from '../../components/general/mini_components';
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

const SectionHeader: React.FC<SectionHeaderProps> = ({ section, edit, addCallback, editCallback }) => {
   
    function renderIcon(){
        switch(section){
            case "laboratory":
                return <img src={iconLab } alt="images" width="20" />
            case "medical-imaging":
                return <img src={iconImages } alt="images" width="20" />
            case "pharmacy":
                return <LocalPharmacyIcon style={{color:"white"}} />
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
            <Typography variant="h3" gutterBottom display="inline" style={{marginBottom:"0px", color:"white"}}>
                <Translate id={`pages.hospital.${section}.title`} />
            </Typography>
            {
                editCallback && 
                    <IconButton 
                    onClick={(e) => {
                        editCallback();
                    }}>
                    <IconGenerator style={{  color: "white" }} type={!edit ? "settings" : "back"} />
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
