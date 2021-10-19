import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Helmet from "react-helmet";

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
    RootRef,
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
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
Add as AddIcon,
Archive as ArchiveIcon,
FilterList as FilterListIcon,
RemoveRedEye as RemoveRedEyeIcon,
Edit as EditIcon,
Delete as DeleteIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { IconGenerator } from "./mini_components";

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
if (b[orderBy] < a[orderBy]) {
    return -1;
}
if (b[orderBy] > a[orderBy]) {
    return 1;
}
return 0;
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
    numSelected,
    rowCount,
    onRequestSort, 
    headCells
} = props;
const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
    <TableHead>
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
        {headCells.map((headCell) => (
        <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{borderWidth:"4px"}}
        >
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
            >
            {headCell.label}
            </TableSortLabel>
        </TableCell>
        ))}
        {
            (props.actions) &&
            <TableCell align="right">Actions</TableCell>
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
        <Typography variant="h6" id="tableTitle">
            {props.title}
        </Typography>
        )}
    </ToolbarTitle>
    <Spacer />
    <div>
        {numSelected > 0 ? (
        <Tooltip title="Delete">
            <IconButton aria-label="Delete">
            <ArchiveIcon />
            </IconButton>
        </Tooltip>
        ) : noSelectable ? (
        <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {rows, headCells, actions, titleTable, noSelectable} = props;

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
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
            buttonActions.push(
                <IconButton data-testid={action.type} aria-label={action.type} 
                    onClick={(e) => {
                        func(row.id);
                        e.stopPropagation();
                    }}>
                    <IconGenerator type={action.type} />
                </IconButton>
            );
        }
        return buttonActions;
        
    }
function renderTableRow(isItemSelected, index, labelId, row, draggableProps, dragHandleProps, innerRef){
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
            innerRef={innerRef}
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
                    return <TableCell key={headCell.id} align={headCell.alignment}>{value}</TableCell>
                    
                })
            }         
            {
                props.actions && 
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
    return props.droppableId ? (
        <Droppable droppableId={props.droppableId ? props.droppableId : "droppableId"}>
        {
            (provided, snapshot) =>(
                <RootRef rootRef={provided.innerRef}>
                <TableBody>
                    
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return props.droppableId ? (
                        <Draggable draggableId={`item-${props.droppableId}-${row.id}`} index={index}
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
                </RootRef>
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
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        }
        
    </Paper>
    </div>
);
}

export function OrderList() {
return (
    <React.Fragment>
    <Helmet title="Orders" />

    <Grid justify="space-between" container spacing={24}>
        <Grid item>
        <Typography variant="h3" gutterBottom display="inline">
            Orders
        </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
            Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
            Pages
            </Link>
            <Typography>Orders</Typography>
        </Breadcrumbs>
        </Grid>
        <Grid item>
        <div>
            <Button variant="contained" color="primary">
            <AddIcon />
            New Order
            </Button>
        </div>
        </Grid>
    </Grid>

    <Divider my={6} />

    <Grid container spacing={6}>
        <Grid item xs={12}>
        <EnhancedTable rows={rows} headCells={headCells} />
        </Grid>
    </Grid>
    </React.Fragment>
);
}

 
