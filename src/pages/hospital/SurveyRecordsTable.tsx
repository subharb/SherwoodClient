import React from 'react';
import { IField, ISubmission } from '../../constants/types';
import survey from '../../components/investigation/survey';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { dateAndTimeFromPostgresString, fullDateFromPostgresString } from '../../utils';

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
    
    const rows = submissions.map((submission, index) => {
        let record = {id:index, date : dateAndTimeFromPostgresString(locale, submission.updatedAt)};

        for(let i = 0; i < headCells.length; i++){
            const valueField = headCells[i].id;
            const field = submission.surveyRecords.find((record) => record.surveyField.name === valueField);
            const value = field?.surveyField.type === "textarea" ?  <div dangerouslySetInnerHTML={{__html: field.value }}></div>   : field?.value;
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
