import React from 'react';
import { IField, ISubmission } from '../../constants/types';
import survey from '../../components/investigation/survey';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { dateAndTimeFromPostgresString, fullDateFromPostgresString } from '../../utils';
import Check from '@mui/icons-material/Check';

interface SurveyRecordsTableProps {
    fields: IField[];
    submissions: ISubmission[];
    locale:string,
    onSelectSubmission: (index:number) => void;
}

const SurveyRecordsTable: React.FC<SurveyRecordsTableProps> = ({ fields, locale, submissions, onSelectSubmission }) => {
    let headCells = fields.map((field) => ({
        id: field.name,
        alignment: "left",
        label: field.label
    }));
    
    function renderValue(value:any, type:string){
        switch(type){
            case "textarea":
                return <div dangerouslySetInnerHTML={{__html: value }}></div>;
            case "multioption":
                return value[0].multioption;
            case "checkbox":
                return <Check checked={value === "true"} />
            default:
                return value;
        }
    }
    const rows = submissions.map((submission, index) => {
        let record = {id:index, date : dateAndTimeFromPostgresString(locale, submission.updatedAt)};

        for(let i = 0; i < headCells.length; i++){
            const valueField = headCells[i].id;
            const field = submission.surveyRecords.find((record) => record.surveyField.name === valueField);
            const value = renderValue(field?.value, field?.surveyField.type || "text");
            record[headCells[i].id] = value;
        }

        return record;
    });
    headCells.push({id:"date", alignment:"left", label:"Date"});
    return (
        <EnhancedTable noHeader noSelectable headCells={headCells} rows={rows} 
            selectRow={(index:number) => onSelectSubmission(index)} />
    );
};

export default SurveyRecordsTable;
