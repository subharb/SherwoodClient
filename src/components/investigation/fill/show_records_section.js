import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBack, ButtonForward } from '../../general/mini_components';

/**
 * Component that shows all the records/submissions of a section of a patient
 */
export default function ShowRecordsSection(props) {
    let [indexSubmission, setIndexSubmission ] = useState(0);

    function renderSubmission(){
        const submission = props.submissions[indexSubmission];       
        
        return(
            <div className="container">
                {
                    props.section.fields.map(field => {
                        const value = submission.answers[field.name] ?  submission.answers[field.name] : "no disponible";
                        return (<div className="row">
                                {field.label} : {value}
                                </div>)
                    })
                }
            </div>
        );
    }
    if(indexSubmission < props.submissions.length){
        return (
        
            <div className="container">
                Section:{ props.section.name }
                {
                    renderSubmission(0)
                }
                {
                    props.submissions.length > 1 &&
                    <div className="container">
                        <div className="row">
                            {
                                `${indexSubmission+1} / ${props.submissions.length}`
                            }
                        </div>
                        <div className="row">
                            <ButtonBack disabled={indexSubmission === 0} onClick={() => setIndexSubmission(indexSubmission-1)}></ButtonBack>
                            <ButtonForward disabled={indexSubmission === props.submissions.length -1} onClick={() => setIndexSubmission(indexSubmission+1)}></ButtonForward>
                        </div>
                    </div>
                }
            </div>  
        )
    }
    else{
        return "Index not available"
    }
    
}

ShowRecordsSection.propTypes = {
    section: PropTypes.object,
    submissions: PropTypes.array
};