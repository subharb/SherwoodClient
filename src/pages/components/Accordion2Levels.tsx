import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ButtonAdd, IconGenerator } from '../../components/general/mini_components';
import { Translate } from 'react-localize-redux';

export type MainElementType = {name:string, uuid:string, subElements:any[]}
interface Accordion2LevelsProps {
    orderedMainElements: MainElementType[];
    addSubElementCallBack?: (uuid:string) => void;
    viewSubElementCallBack?: (uuid:string) => void;
    editMainElementCallBack?:(uuid:string) => void;
    editSubElementCallBack?:(uuid:string) => void;
    deleteMainElementCallBack?:(uuid:string) => void;
    deleteSubElementCallBack?:(uuid:string) => void;
    checkCanDeleteMainElement?: (uuid:string) => boolean;
    checkCanDeleteSubElement?: (uuid:string) => boolean;
    configureSubElementCallBack?: (uuid:string) => void;
}

const Accordion2Levels: React.FC<Accordion2LevelsProps> = ({ orderedMainElements, addSubElementCallBack, viewSubElementCallBack, configureSubElementCallBack, editSubElementCallBack, deleteMainElementCallBack, deleteSubElementCallBack, editMainElementCallBack }) => {
    
    

    function renderSecondSubLevel(mainElement:MainElementType){
        if(mainElement.subElements[0].hasOwnProperty("subElements")){
            return (
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
                    }
                    {
                        configureSubElementCallBack &&
                        <IconButton color='default' onClick={(e) => {
                            e.stopPropagation();
                            configureSubElementCallBack(subElement.uuid);
                            }}>
                            <IconGenerator color="#000" type="settings" />
                        </IconButton>
                    }
                    </Typography>
                    </AccordionSummary>
                </Accordion>
                )
                    
                })
            )
        }
        else{
            return mainElement.subElements.map((subElement) => {
                return (
                <ListItem button>
                    <ListItemText primary={`${subElement.name}`} onClick={() =>viewSubElementCallBack ? viewSubElementCallBack(subElement.uuid) : undefined} /> 
                        {
                            viewSubElementCallBack &&
                            <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    viewSubElementCallBack(subElement.uuid);
                                }}>
                                <IconGenerator type="view" />
                            </IconButton>
                        }
                        
                        {
                            editSubElementCallBack &&
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                editSubElementCallBack(subElement.uuid);
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
                        }
                        
                        {
                            configureSubElementCallBack &&
                            <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    configureSubElementCallBack(subElement.uuid);
                                }}>
                                <IconGenerator color="#000"  type="settings" />
                            </IconButton>
                        }
                        
                </ListItem>)
                }
            )
        }
    }
    function renderSubLevel(mainElement:MainElementType){
        if(mainElement.subElements.length > 0){
            return (
                <List component="nav" aria-label="main mailbox folders">
                    {
                        renderSecondSubLevel(mainElement)
                    }
                </List>
                )
            }   
    }
    
    const accordionElements = orderedMainElements.length > 0 &&
        orderedMainElements.map(mainElement => {
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
