import React from 'react';
import { EnhancedTable } from './EnhancedTable';
import { DragDropContext } from 'react-beautiful-dnd';

function OrderableTable(props) {
    function dragEnd(result){
        if(result.destination){
            props.onDragEnd(result);
        }
    }
    return (
        <DragDropContext
            onDragEnd={(result) => dragEnd(result)}>
            <EnhancedTable {...props} />
        </DragDropContext>
    );
}

export default OrderableTable;