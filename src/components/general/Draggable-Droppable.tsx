import React, {useEffect, useRef, useState} from 'react';
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import {createPortal} from 'react-dom';
import {
  Announcements,
  closestCenter,
  CollisionDetection,
  DragOverlay,
  DndContext,
  DropAnimation,
  defaultDropAnimation,
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  MeasuringConfiguration,
  PointerActivationConstraint,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
  rectSortingStrategy,
  AnimateLayoutChanges,
} from '@dnd-kit/sortable';

interface Props{
    id : string
}

const RowGrid = styled(Grid)`
    display:flex;
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
    const sortable = useSortable({id: props.id});
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}
