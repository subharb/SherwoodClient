import React, { useState } from 'react';
import { EnhancedTable } from './EnhancedTable';
import { DragDropContext } from 'react-beautiful-dnd';

function OrderableTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    function handleChangePage(page){
        console.log(page);
        setCurrentPage(page);
    }
    function dragEnd(result){
        if(result.destination){
            result.source.index = result.source.index + (currentPage)*10;
            result.destination.index = result.destination.index + (currentPage)*10;
            props.onDragEnd(result);
        }
    }
    return (
        <DragDropContext
            onDragEnd={(result) => dragEnd(result)}>
            <EnhancedTable {...props} changePageCallback={handleChangePage} />
        </DragDropContext>
    );
}

export default OrderableTable;