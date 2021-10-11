import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

interface Props{
    id : string
}

const RowGrid = styled(Grid)`
    display:flex;
    border-bottom:2px #ccc solid;
`;


export const Droppable:React.FC<Props> = (props) => {  
    const {isOver, setNodeRef} = useDroppable({    id: props.id,  });  
    const style = {    color: isOver ? 'green' : undefined, display:'flex'  };      
    return (    
        <RowGrid item container ref={setNodeRef} style={style}>      
            {props.children}    
        </RowGrid>  
    );
}

export const  Draggable:React.FC<Props> = (props) => {  
    const {attributes, listeners, setNodeRef, transform} = useDraggable({    id: props.id,  });  
    const style = transform ? {    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, display:'flex' } : undefined;    
    return (    
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>      
            {props.children}    
        </div>  
    );
}

export const SortableItem:React.FC<Props> = (props) => {  
    const {    attributes,    listeners,    setNodeRef,    transform,    transition,  } = useSortable({id: props.id});    
    const style = {    transform: CSS.Transform.toString(transform),    transition, display:'flex' };    
    return (    
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>      
            {
                props.children
            }    
        </div>  
    );
}