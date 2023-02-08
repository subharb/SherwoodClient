import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, List, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ButtonAdd, IconGenerator } from '../../components/general/mini_components';
import { Translate } from 'react-localize-redux';

export type MainElementType = {name:string, uuid:string, subElements:any[]}
interface Accordion2LevelsProps {
    orderedMainElements: MainElementType[];
    addSubElementCallBack: (uuid:string) => void;
    editMainElementCallBack:(uuid:string) => void;
    editSubElementCallBack:(uuid:string) => void;
    deleteMainElementCallBack:(uuid:string) => void;
    deleteSubElementCallBack:(uuid:string) => void;
    checkCanDeleteMainElement: (uuid:string) => boolean;
    checkCanDeleteSubElement: (uuid:string) => boolean;
}

const Accordion2Levels: React.FC<Accordion2LevelsProps> = ({ orderedMainElements, addSubElementCallBack, editSubElementCallBack, deleteMainElementCallBack, deleteSubElementCallBack, editMainElementCallBack }) => {
    
    let ordereredMainElements = orderedMainElements.sort((a,b) => a.name.localeCompare(b.name));

    function renderSubLevel(mainElement:MainElementType){
        return (
            <List component="nav" aria-label="main mailbox folders">
                {
                    mainElement.subElements.map((subElement) => {
                        
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                <Typography >{ subElement.name}  {
                                editSubElementCallBack &&
                                <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    editSubElementCallBack(subElement);
                                    }}>
                                    <IconGenerator type="edit" />
                                </IconButton>
                            }
                        {
                            deleteSubElementCallBack &&
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                deleteSubElementCallBack(subElement.uuid);
                                }}>
                                <IconGenerator type="delete" />
                            </IconButton>
                        }</Typography>
                            </AccordionSummary>
                        </Accordion>
                        )
                        
                    })
                }
            </List>
            )
        }
    const accordionElements = ordereredMainElements.length > 0 &&
        ordereredMainElements.map(mainElement => {
            return (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography >{ mainElement.name}
                        {
                            addSubElementCallBack &&
                            <ButtonAdd 
                                type="button" data-testid="add_researcher" 
                                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.stopPropagation();addSubElementCallBack(mainElement.uuid as string) }} />
                        }
                        </Typography>
                        {
                            editMainElementCallBack &&
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                editMainElementCallBack(mainElement.uuid);
                                }}>
                                <IconGenerator type="edit" />
                            </IconButton>
                        }
                        {
                            deleteMainElementCallBack &&
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                deleteMainElementCallBack(mainElement.uuid);
                                }}>
                                <IconGenerator type="delete" />
                            </IconButton>
                        }
                            
                    </AccordionSummary>
                    <AccordionDetails style={{"flexDirection": "column"}} className="accordion_details">
                            {
                                renderSubLevel(mainElement)
                            }
                        
                    </AccordionDetails>
                </Accordion>
            )
        })
    return (
        <>
            {accordionElements}
        </>
    );
    
};

export default Accordion2Levels;
