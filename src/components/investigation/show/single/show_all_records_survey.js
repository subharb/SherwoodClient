import React, { useEffect} from 'react'
import PropTypes from 'prop-types';

/**
 * 
 * Component that shows all records of a given survey. 
 * It allows to navigate visualiazing each patient and its sections at a time.
 */
export default function ShowAllRecordsSurvey(props) {
    useEffect(() => {
        //Agrupamos los records por paciente
        
    }, []);
    return (
        <div>
            ShowAllRecordsSurvey {props.surveyName}
        </div>
        
    )
}

ShowAllRecordsSurvey.propTypes = {
    records: PropTypes.array,
    surveyName: PropTypes.string
};
