import React, { useEffect, useState } from 'react'
import * as ECT from '@whoicd/icd11ect';
import '@whoicd/icd11ect/style.css';
import { getTokenWho } from '../../../services/sherwoodService';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { TextField } from '@material-ui/core';

function ICTSelector(props){
    const [show, setShow] = useState(false);
    const [diagnose, setDiagnose] = useState("");

    function resetField(){
        //props.resetDiagnose();
        setDiagnose("");
    }
    useEffect(() => {
        
        const mySettings = {
            apiServerUrl: "https://id.who.int",   
            apiSecured: true,
            icdMinorVersion: "2020-09" ,
            icdLinearization: "mms",
            language: "fr",
            sourceApp: "Sherwood",
            wordsAvailable: false,
            chaptersAvailable: true,
            flexisearchAvailable: true,
            autoBind:false,
            height: "500px"
        };
        const myCallbacks = {
            searchStartedFunction: () => {
                //this callback is called when searching is started.
                console.log("Search started!");
            },
            searchEndedFunction: () => {
                //this callback is called when search ends.
                console.log("Search ended!");
            },
            selectedEntityFunction: (selectedEntity) => {
            //This callback is called when the user makes a selection
            //This is the best way to get what the user has chosen and use it in 
            //your application
                console.log('selected uri: '+ selectedEntity.uri);
                console.log('selected code: '+ selectedEntity.code);
                console.log('selected bestMatchText: '+ selectedEntity.bestMatchText);
                ECT.Handler.clear("1");
                setDiagnose("");
                props.diagnosisSelected({
                    ict:selectedEntity.title,
                    "ict-code" : selectedEntity.code
                });
            },
            getNewTokenFunction: async () => {
                // if the embedded coding tool is working with the cloud hosted ICD-API, you need to set apiSecured=true
                // In this case embedded coding tool calls this function when it needs a new token.
                // In this case you backend web application should provide updated tokens 
                
                const response = await getTokenWho(props.translate("lang"));
                if(response.status === 200){
                    return response.token;
                }
                // const url = 'http://myhost.com/mybackendscript' // we assume this backend script returns a JSON {'token': '...'} 
                // try {
                //     const response = await fetch(url);
                //     const result = await response.json();
                //     const token = result.token;
                //     return token; // the function return is required 
                // } catch (e) {
                //     console.log("Error during the request");
                // }
            }
        };
        ECT.Handler.configure(mySettings, myCallbacks);
        ECT.Handler.bind("1");
        
    }, [show])
    
    const value = diagnose !== "" ? diagnose : props.value;
    return ([
        <div>
            <TextField key="ict-input" {...props} value = {value} onFocus={resetField}
                inputProps={{className : "ctw-input", "data-ctw-ino" : "1"}}   />
            <div key="ict-container" className="ctw-window" data-ctw-ino="1"></div>
        </div>
    ]
        
    )
}

ICTSelector.propTypes = {
    typeUser:PropTypes.string
}

export default withLocalize(ICTSelector)