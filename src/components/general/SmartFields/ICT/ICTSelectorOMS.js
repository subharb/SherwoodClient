import React, { useEffect, useState } from 'react'
import * as ECT from '@whoicd/icd11ect';
import '@whoicd/icd11ect/style.css';
import { getTokenWho } from '../../../../services';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import { Grid, TextField } from '@material-ui/core';
import { FieldWrapper, IconGenerator } from '../../mini_components';
import styled from 'styled-components';

const RedoHolder = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
`
function ICTSelectorOMS(props){
    const [show, setShow] = useState(false);
    const [textDiagnose, setTextDiagnose] = useState("");
    function redoSearch(){
        console.log("Redo Search")
        setTextDiagnose("");
        props.resetICTSelectorCallback();
    }
    function onChange(event){
        console.log(event.target.value);
        setTextDiagnose(event.target.value);
    }
    useEffect(() => {
        const mySettings = {
            apiServerUrl: "https://id.who.int",   
            apiSecured: true,
            icdMinorVersion: "2022-02" ,
            icdLinearization: "mms",
            language: props.language,
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
                setTextDiagnose(selectedEntity.title);
                
    
                if(selectedEntity){
                    const tempValue = {
                        "ict" : selectedEntity.title,
                        "ict-code" : selectedEntity.code
                    }
                   
                   
                    props.elementSelected(tempValue);    
                }
                
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
    
    //const value = textDiagnose ? textDiagnose : props.value;
    const value = props.value ? props.value : textDiagnose;
    return ([
        <FieldWrapper>
            <div style={{display:'flex'}}>
                <TextField key="ict-input" {...props} label={props.translate("hospital.select-ict")} value = {value}
                    inputProps={{className : "ctw-input", "data-ctw-ino" : "1"}} fullWidth onChange={(event) => onChange(event) } />
                {
                    props.resetICTSelectorCallback && 
                    <RedoHolder onClick={redoSearch} >
                        <IconGenerator type="undo" /> 
                    </RedoHolder>
                }
            </div>
        </FieldWrapper>,
        <div key="ict-container" className="ctw-window" data-ctw-ino="1"></div>
    
    ]
        
    )
}

ICTSelectorOMS.propTypes = {
    typeUser:PropTypes.string
}

export default withLocalize(ICTSelectorOMS)