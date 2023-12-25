import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Checkbox,
    Chip as MuiChip,
    Divider as MuiDivider,
    Grid,
    IconButton,
    Link,
    Paper as MuiPaper,
    
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import { green, grey, orange, red } from "@mui/material/colors";

import {
    Add as AddIcon,
    Archive as ArchiveIcon,
    FilterList as FilterListIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
    } from "@mui/icons-material";

import { spacing } from "@mui/system";
import { IconGenerator } from "./mini_components";
import { isNumber } from "lodash";
import { Translate } from "react-localize-redux";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TableSizes = styled(Table)`
    ${({ miniTable }) => !miniTable && `
        min-width:600px
    `}
    `;
const Chip = styled(MuiChip)`
${spacing};

background: ${(props) => props.shipped && green[500]};
background: ${(props) => props.processing && orange[700]};
background: ${(props) => props.cancelled && red[500]};
color: ${(props) => props.theme.palette.common.white};
`;

const Spacer = styled.div`
flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
min-width: 150px;
`;

function createData(id, product, date, total, status, method) {
return { id, product, date, total, status, method };
}

const rows = [
createData(
    "000253",
    "Salt & Pepper Grinder",
    "2020-01-02",
    "$32,00",
    0,
    "Visa"
),
createData("000254", "Backpack", "2020-01-04", "$130,00", 0, "PayPal"),
createData(
    "000255",
    "Pocket Speaker",
    "2020-01-04",
    "$80,00",
    2,
    "Mastercard"
),
createData("000256", "Glass Teapot", "2020-01-08", "$45,00", 0, "Visa"),
createData(
    "000257",
    "Unbreakable Water Bottle",
    "2020-01-09",
    "$40,00",
    0,
    "PayPal"
),
createData("000258", "Spoon Saver", "2020-01-14", "$15,00", 0, "Mastercard"),
createData("000259", "Hip Flash", "2020-01-16", "$25,00", 1, "Visa"),
createData("000260", "Woven Slippers", "2020-01-22", "$20,00", 0, "PayPal"),
createData("000261", "Womens Watch", "2020-01-22", "$65,00", 2, "Visa"),
createData(
    "000262",
    "Over-Ear Headphones",
    "2020-01-23",
    "$210,00",
    0,
    "Mastercard"
),
];

function descendingComparator(a, b, orderBy) {
    const aString = a[orderBy] ? a[orderBy].toString().toLowerCase() : "";
    const bString = b[orderBy] ? b[orderBy].toString().toLowerCase() : "";
    return aString.localeCompare(bString)
}

function getComparator(order, orderBy) {
return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
});
return stabilizedThis.map((el) => el[0]);
}

const headCells = [
{ id: "id", alignment: "right", label: "Order ID" },
{ id: "product", alignment: "left", label: "Product" },
{ id: "date", alignment: "left", label: "Date" },
{ id: "total", alignment: "right", label: "Total" },
{ id: "status", alignment: "left", label: "Status" },
{ id: "method", alignment: "left", label: "Payment Method" },
{ id: "actions", alignment: "right", label: "Actions" },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        disableOrder,
        numSelected,
        rowCount,
        onRequestSort, 
        headCells
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [checkboxesState, setCheckboxesState] = React.useState({});

    function changeCheckboxState(headId, callback){
        setCheckboxesState({ ...checkboxesState, [headId]: !checkboxesState[headId] })
        callback();
    }
    return (
        <TableHead style={{fontWeight:'600', backgroundColor:grey[100]}}>
        <TableRow> 
            {!props.noSelectable &&
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all" }}
                    />
                </TableCell>
            }
            {headCells.map((headCell) => {
                const disableOrderCell = props.disableOrder || props.typeHeadCells[headCell.id] === 'object';
                return(
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignment}
                        //padding={headCell.disablePadding || props.dense ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        
                    >
                        <TableSortLabel
                            active={disableOrderCell ? false : orderBy === headCell.id }
                            hideSortIcon={disableOrderCell}
                            direction={disableOrderCell ? "" : orderBy === headCell.id ? order : "asc"}
                            onClick={!disableOrderCell ? createSortHandler(headCell.id) : null}
                            style={{fontWeight:"600"}}
                        >
                        {
                            headCell.markAllCallback &&
                            <span><Checkbox
                            
                                checked={checkboxesState[headCell.id] || false}
                                onChange={() => changeCheckboxState(headCell.id, headCell.markAllCallback)}
                                inputProps={{ "aria-label": "select all" }}
                            /></span>
                        }
                        {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                )
            }
            
            )}
            {
                (props.actions && props.actions.length > 0) &&
                <TableCell style={{fontWeight:"600"}} align="right"><Translate id="general.actions"/></TableCell>
            } 
        </TableRow>
        </TableHead>
    );
}

let EnhancedTableToolbar = (props) => {
const { numSelected, noSelectable } = props;

return (
    <Toolbar>
    <ToolbarTitle>
        {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
        </Typography>
        ) : (
        <Typography variant="h5" id="tableTitle"  style={{fontSize:'1.2rem'}}>
            {props.title}
        </Typography>
        )}
    </ToolbarTitle>
    <Spacer />
    <div>
        {numSelected > 0 ? (
        <Tooltip title="Delete">
            <IconButton aria-label="Delete" size="large">
            <ArchiveIcon />
            </IconButton>
        </Tooltip>
        ) : noSelectable ? (
        <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" size="large">
            <FilterListIcon />
            </IconButton>
        </Tooltip>
        ) : null }
    </div>
    </Toolbar>
);
};

export function EnhancedTable(props) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("customer");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState( props.noFooter ? props.rows.length : 10);
    console.log("rowsPerPage", rowsPerPage);
    const {rows, headCells, actions, titleTable, noSelectable} = props;

    useEffect(() => {
        if(isNumber(props.currentPage)){
            setPage(props.currentPage);
        }
    }, [props.currentPage])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    useEffect(() => {
        if(props.noPagination){
            setRowsPerPage(props.rows.length + 1);
        }
    }, [props.rows])

const handleClick = (event, id) => {
    console.log("Pincho en la tabla"+id, event );
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
    );
    }

    setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(typeof props.changePageCallback === 'function'){
        props.changePageCallback(newPage)
    }
    
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
};


const isSelected = (id) => selected.indexOf(id) !== -1;

const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    function renderActions(row){
        let buttonActions = []
        for(let i = 0; i < props.actions.length; i++){
            const action = props.actions[i];
            const func = action["func"];
            const check = action["check"];
            if(check === undefined || check(row)){
                buttonActions.push(
                    <IconButton
                        data-testid={action.type}
                        aria-label={action.type}
                        onClick={(e) => {
                            e.stopPropagation();
                            func(row.id);
                            
                        }}
                        size="large">
                        <IconGenerator type={action.type} />
                    </IconButton>
                );
            }
            
        }
        return buttonActions;
        
    }
function renderTableRow(isItemSelected, index, labelId, row, draggableProps, dragHandleProps, innerRef){
    const hasColsPan = row.hasOwnProperty("colSpan");
    let headCellColSpanPrev = null;
    let headCellColSpan = null;
    if(hasColsPan){
        //find the headCell previous to the one that should have a colSpan
        const headCellColSpanIndex = headCells.findIndex(headCell => headCell.id === row.colSpan);
        headCellColSpan = headCells[headCellColSpanIndex];
        headCellColSpanPrev = headCells[headCellColSpanIndex - 1];
    }
    return(
        <TableRow
            hover
            role="checkbox"  
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`${index}`}
            selected={isItemSelected}
            onClick={props.selectRow ? () => props.selectRow( row.id) : null}
            {...draggableProps}
            {...dragHandleProps}
            ref={ innerRef }
        >   
        {
            !noSelectable &&
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={(event) => handleClick(event, row.id)}
                />
            </TableCell>
        }
            
        {
            headCells.map(headCell =>{
                let value = row[headCell.id];
                if(typeof row[headCell.id] === "boolean"){ 
                    value = <Checkbox checked={row[headCell.id]} onClick={props.callBackCheckbox ? () => props.callBackCheckbox(row.id, headCell.id, !row[headCell.id]) : null} />
                }
                if(headCellColSpanPrev && headCellColSpanPrev.id === headCell.id){
                    return null;
                }
                return <TableCell key={headCell.id} 
                            colSpan={headCellColSpan && headCellColSpan.id === headCell.id ? 2 : 1}
                            //padding={props.dense ? "none" : "default"}
                            align={headCellColSpan && headCellColSpan.id === headCell.id ? "right" : headCell.alignment}>{value}</TableCell>
                
            })
        }         
        {
            (props.actions && props.actions.length > 0) && 
            <TableCell padding="none" align="right">
                <Box mr={2}>
                    {
                        renderActions(row)
                    }
                </Box>
            </TableCell>
        }   
            </TableRow>
    )
}
function renderBody(){
    console.log("props.disableOrder", props.disableOrder);
    return props.droppableId ? (
        <Droppable droppableId={props.droppableId ? props.droppableId : "droppableId"}>
        {
            (provided, snapshot) =>(
                
                <TableBody {...provided.draggableProps}
                    ref={provided.innerRef}>
                    
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return props.droppableId ? (
                        <Draggable key={row.id} draggableId={`item-${props.droppableId}-${row.id}`} 
                            index={index}
                            isDragDisabled={!props.droppableId}>
                            {
                                (provided, snapshot)=>(
                                    
                                    renderTableRow(isItemSelected, index, labelId, row, provided.draggableProps, provided.dragHandleProps, provided.innerRef)
                                )
                            }
                            
                        </Draggable>
                    ) : 
                    renderTableRow(isItemSelected, index, labelId, row, {}, {}, null)
                    })
                }
                { provided.placeholder}
                </TableBody>
                
            )
        }
    </Droppable>) : 
    
    <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return renderTableRow(isItemSelected, index, labelId, row, {}, {}, null)
            
            })
        }
    </TableBody>;
}
const typeHeadCells = rows.length > 0 ? headCells.reduce((accumulator, headCell) => {
    const valueType = rows[0][headCell.id] ? typeof rows[0][headCell.id] : null;
    accumulator[headCell.id] = valueType;
    return accumulator
    }, {}) : {};
return (
    <div >
    <Paper>
        {
            !props.noHeader &&
            <EnhancedTableToolbar title={titleTable} numSelected={selected.length} />
        }
        <TableContainer>
            <TableSizes miniTable={props.miniTable} 
                aria-labelledby="tableTitle"
                size={"medium"} 
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    dense={props.dense}
                    disableOrder={props.disableOrder}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    typeHeadCells={typeHeadCells}
                    headCells={headCells}
                    actions={actions}
                    noSelectable={noSelectable}
                />
                {
                    renderBody()
                }
                
            </TableSizes>
        </TableContainer>
        {
            !props.noFooter &&
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        }
        
    </Paper>
    </div>
);
}