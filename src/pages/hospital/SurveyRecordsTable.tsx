import React from 'react';
import { IField, ISubmission } from '../../constants/types';
import survey from '../../components/investigation/survey';
import { EnhancedTable } from '../../components/general/EnhancedTable';

interface SurveyRecordsTableProps {
    fields: IField[];
    submissions: ISubmission[];
    onSelectSubmission: (index:number) => void;
}

const SurveyRecordsTable: React.FC<SurveyRecordsTableProps> = ({ fields, submissions, onSelectSubmission }) => {
    const headCells = fields.map((field) => ({
        id: field.name,
        alignment: "left",
        label: field.label
    }));
    const rows = submissions.map((submission, index) => {
        let record = {id:index};

        for(let i = 0; i < headCells.length; i++){
            const valueField = headCells[i].id;
            const value = submission.surveyRecords.find((record) => record.surveyField.name === valueField)?.value;
            record[headCells[i].id] = value;
        }

        return record;
    });
    return (
        <EnhancedTable noHeader noSelectable headCells={headCells} rows={rows} 
            selectRow={(index:number) => onSelectSubmission(index)} />
    );
};

export default SurveyRecordsTable;
