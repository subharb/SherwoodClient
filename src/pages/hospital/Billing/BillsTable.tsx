import React, { useEffect, useMemo, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { BillActions, paidStatusToIcon, documentStatusToIcon, documentTypeToIcon, paidStatusToColor } from '.';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { fullDateFromPostgresString } from '../../../utils/index.jsx';
import SearchBox, { FilterItem } from '../../../components/general/SearchBox';
import { BillStatus } from '../Service/types';
import { green, red, yellow } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { ColourButton, ColourChip } from '../../../components/general/mini_components-ts';
import { TabsSherwood } from '../../components/Tabs';
import { Bill, DocumentStatus, DocumentType } from './types';
import { HOSPITAL_BILLING_VIEW_DOCUMENT } from '../../../routes/urls';
import { useHistory } from 'react-router-dom';
import { documentStatusToColor, documentTypeToColor } from '../../../utils/bill';
import { Done, Edit, Lock, Schedule } from '@mui/icons-material';

type BillsTableProps = {
    bills: any[];
    patients: any[];
    languageCode: string;
    currency: string;
    hasBudgets: boolean;
    canCreateBugdet: boolean;
    makeActionBillCallBack: (index:number, action:BillActions) => void;
};

const BillsTable: React.FC<BillsTableProps> = ({ bills, patients, languageCode, currency, canCreateBugdet, 
                                                    hasBudgets, makeActionBillCallBack }) => {
    const [patientName, setPatientName] = useState<string>("");
    const [statusPaidFilter, setStatusPaidFilter] = useState<BillStatus[]>([]);
    const [documentStatusFilter, setDocumentStatusFilter] = useState<DocumentStatus[]>([]);
    const [typeFilter, setTypeFilter] = useState<DocumentType[]>([]);
    const [currentPageTable, setCurrentPageTable] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        setCurrentPageTable(0);
    }, [patientName, statusPaidFilter, documentStatusFilter, typeFilter]);

    function changePageCallback(currentPage:number){
        setCurrentPageTable(currentPage);
    }

    const billsPatients = useMemo(() => {
        return bills.map((bill, indexBill) => {
            const patient = patients.find((patient) => patient.uuid === bill.uuidPatient);
            return {
                "idInvestigation" : bill.count,
                "id" : indexBill,
                "uuid" : bill.uuid,
                "type" : bill.type,
                "health_id" : patient?.personalData.automated_health_id ? patient?.personalData.automated_health_id : patient?.personalData.healthId,
                "patientName" :patient?.personalData.name+" "+patient?.personalData.surnames, 
                "patient" : <><ColourButton size='small' icon={documentTypeToIcon(bill.type)}  rgbcolor={documentTypeToColor(bill.type)} label={null}/> {patient?.personalData.name+" "+patient?.personalData.surnames}</>, 
                "total" : new Intl.NumberFormat(languageCode).format(Number(bill.total)),
                "status" : renderStatus(bill.status, bill.type, hasBudgets, (Number(bill.total) - Number(bill.totalPaid)) === 0 ? BillStatus.PAID : BillStatus.PENDING_PAYMENT),
                "statusValue" : bill.status,
                "paidStatus" : (bill.type === DocumentType.INVOICE && bill.status === DocumentStatus.CLOSED) ? (Number(bill.total) - Number(bill.totalPaid)) === 0 ? BillStatus.PAID : BillStatus.PENDING_PAYMENT : null,
                "dateCreation" : fullDateFromPostgresString(languageCode, bill.createdAt)
            }
        })}, [bills, patients, languageCode]);
    
    function callbackNameTyped(name:string){
        setPatientName(name);        
    }

    function renderStatus(billStatus:DocumentStatus, billType:DocumentType, hasBudgets:boolean, paidStatus:BillStatus){
        let listChips = [];
        if(billStatus === DocumentStatus.DRAFT){
            listChips.push(<ColourButton icon={documentStatusToIcon(billStatus)} rgbcolor={documentStatusToColor(billStatus)} label=""/>);
        }
        else{
            listChips.push(<ColourButton icon={documentStatusToIcon(billStatus)} rgbcolor={documentStatusToColor(billStatus)} label="" />);
        }
        
        if(billStatus === DocumentStatus.CLOSED && billType === DocumentType.INVOICE){
            listChips.push(<ColourButton icon={paidStatusToIcon(paidStatus)} rgbcolor={paidStatusToColor(paidStatus)} label=""  /> );
        }
        
        return listChips;
    }
    function renderCore(){
        const rows = billsPatients.filter((bill) => {
            let shouldBeFiltered = patientName.length === 0;
            const activeNameFilter = patientName.length > 0;
            let matchNameFilter = false;
            if(activeNameFilter){
                matchNameFilter = bill.patientName.toLocaleLowerCase().includes(patientName.toLocaleLowerCase()) || bill.health_id?.toLocaleLowerCase().includes(patientName.toLocaleLowerCase());
                shouldBeFiltered = matchNameFilter;
            }
            if(statusPaidFilter.length > 0){
                shouldBeFiltered = activeNameFilter ? matchNameFilter && statusPaidFilter.includes(bill.paidStatus) : statusPaidFilter.includes(bill.paidStatus);
            }
            if(typeFilter.length > 0){
                shouldBeFiltered = activeNameFilter ? matchNameFilter && typeFilter.includes(bill.type) : typeFilter.includes(bill.type);
            }
            if(documentStatusFilter.length > 0){
                shouldBeFiltered = activeNameFilter ? matchNameFilter && documentStatusFilter.includes(bill.statusValue) : documentStatusFilter.includes(bill.statusValue);
            }
            return shouldBeFiltered;
        })
        const headCells = [
                { id: "idInvestigation", alignment: "left", label: "ID" },
                { id: "health_id", alignment: "left", label: <Translate id={`investigation.create.personal_data.short-fields.automated_health_id`} /> },
                { id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
                { id: "total", alignment: "left", label: [<Translate id={`hospital.billing.bill.total`} />,"("+currency+")"] },
                { id: "status", alignment: "left", label: [<Translate id={`hospital.billing.bill.status`} />]},
                { id: "dateCreation" , alignment: "right",  label: [<Translate id={`hospital.billing.bill.date`} />] } 
        ];

        return <EnhancedTable noHeader headCells={headCells} rows={rows}  noSelectable
                    selectRow={
                        (index:number) => {
                            const findBill = rows.find((bill) => bill.id === index);
                            if(findBill){
                                history.push(HOSPITAL_BILLING_VIEW_DOCUMENT.replace(":uuidDocument", findBill.uuid))}
                            }
                        } 
                        currentPage={currentPageTable} 
                        changePageCallback={changePageCallback}
                        actions={[{"type" : "pdf", "check" :(bill:any) => bill.statusValue === DocumentStatus.CLOSED, 
                                    "func" : (index:number) => {
                                        const findBill = rows.find((bill) => bill.id === index);
                                        if(findBill){
                                            makeActionBillCallBack(findBill.uuid, BillActions.PREVIEW)
                                        }
                                    }
                            }]} 
                            />
    }

    function applyFilterGeneral(filter:number[] , functionAdd: (value:number[]) => void, value:number){
        if(filter && filter.includes(value)){
            if(filter.length === 1){
                functionAdd([]);
            }
            else{
                functionAdd(filter.filter((s) => s !== value));
            }
        }
        else if(filter){
            functionAdd([...filter, value]);
        }
        else{
            functionAdd([value]);
        }
    }

    function applyDocumentStatus(status:DocumentStatus){
        applyFilterGeneral(documentStatusFilter, setDocumentStatusFilter, status);
    }

    function applyTypeStatusFilter(type:DocumentType){
        applyFilterGeneral(typeFilter, setTypeFilter, type);
    }

    function applyStatusPaidFilter(status:BillStatus){
        applyFilterGeneral(statusPaidFilter, setStatusPaidFilter, status);
    }

    let filterItems:FilterItem[] = [
        {label:"draft", selected: documentStatusFilter.includes(DocumentStatus.DRAFT),  value:DocumentStatus.DRAFT, icon:documentStatusToIcon(DocumentStatus.DRAFT), color:documentStatusToColor(DocumentStatus.DRAFT), callBack:() => applyDocumentStatus(DocumentStatus.DRAFT)},                        
        {label:"closed", selected: documentStatusFilter.includes(DocumentStatus.CLOSED),  value:DocumentStatus.CLOSED, icon:documentStatusToIcon(DocumentStatus.CLOSED), color:documentStatusToColor(DocumentStatus.CLOSED), callBack:() => applyDocumentStatus(DocumentStatus.CLOSED)},                        
        {label:"paid", selected: statusPaidFilter.includes(BillStatus.PAID), value:BillStatus.PAID, icon:paidStatusToIcon(BillStatus.PAID), color:paidStatusToColor(BillStatus.PAID), callBack:() => applyStatusPaidFilter(BillStatus.PAID)},
        {label:"pending_payment", selected: statusPaidFilter.includes(BillStatus.PENDING_PAYMENT),  value:BillStatus.PENDING_PAYMENT, icon:paidStatusToIcon(BillStatus.PENDING_PAYMENT), color:paidStatusToColor(BillStatus.PENDING_PAYMENT), callBack:() => applyStatusPaidFilter(BillStatus.PENDING_PAYMENT)},
    ];
    if(canCreateBugdet){
        const bugetFilters:FilterItem[] = [
            {label:"summaries", selected: typeFilter.includes(DocumentType.SUMMARY),  value:DocumentType.INVOICE, icon:documentTypeToIcon(DocumentType.SUMMARY), color:documentTypeToColor(DocumentType.SUMMARY), callBack:() => applyTypeStatusFilter(DocumentType.SUMMARY)},
            {label:"budget", selected: typeFilter.includes(DocumentType.BUDGET), value:DocumentType.BUDGET, icon:documentTypeToIcon(DocumentType.BUDGET), color:documentTypeToColor(DocumentType.BUDGET), callBack:() => applyTypeStatusFilter(DocumentType.BUDGET)},
            {label:"invoices", selected: typeFilter.includes(DocumentType.INVOICE),  value:DocumentType.INVOICE, icon:documentTypeToIcon(DocumentType.INVOICE), color:documentTypeToColor(DocumentType.INVOICE), callBack:() => applyTypeStatusFilter(DocumentType.INVOICE)},                         
        ];
        filterItems = [...bugetFilters, ...filterItems];
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchBox textField={{label:"hospital.billing.search_patient", callBack:callbackNameTyped}}
                    filterItems={filterItems} />
            </Grid>
            <Grid item xs={12}>
                {
                    renderCore()
                }
            </Grid>
        </Grid>
    );
};

export default BillsTable;
