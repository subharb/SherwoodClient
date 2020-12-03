import React from 'react'
import { Translate } from 'react-localize-redux';
import Form from '../../general/form';
import { PERSONAL_DATA_FIELDS } from '../../../utils';


export default function PersonalData(props) {
    //Transformo los personal fields a checboxes
    let PERSONAL_DATA_CHECKBOXES = {};
    const arrayKeys = Object.keys(PERSONAL_DATA_FIELDS);
    for(let i = 0; i < arrayKeys.length; i++){
        const currentKey = arrayKeys[i];
        let personalField = {...PERSONAL_DATA_FIELDS[currentKey]};
        personalField.type = "checkbox";
        PERSONAL_DATA_CHECKBOXES[currentKey] = personalField;
    }
    function callBackData(values){
        console.log("CallbackData!", values);
        let tempValues = Object.keys(values).filter(key => {
            return values[key] === true;
        });
        props.callBackData(tempValues);
    }
    return (
        <div className="container">
                <div className="row">
                    <h3><Translate id="investigation.create.personal_data.title" /></h3>
                </div>
                <div className="row">
                    <p>
                        <Translate id="investigation.create.personal_data.intro" />
                    </p>
                </div>
                <div>
                    <Form initialData={props.initialData} 
                            fields={PERSONAL_DATA_CHECKBOXES} submitText = "investigation.create.continue"
                            cancelText = "investigation.create.back"
                            callBackForm={(values) => callBackData(values)} />
                </div>
        </div>
    )
}
