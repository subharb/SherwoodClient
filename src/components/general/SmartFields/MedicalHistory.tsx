import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { isString } from 'lodash';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import ReactQuill from 'react-quill';
import { PropsSmartField, SmartFieldType } from '.';
import axios from '../../../utils/axios';
import Loader from '../../Loader';
import { QuillWrapper } from '../FieldSherwood';
import { ButtonCheck, ButtonContinue, ButtonSave } from '../mini_components';

interface MedicalHistoryAIProps extends PropsSmartField {
    formValues : {[key:string]:{label:string,value:string | any[]}};
    uuidInvestigation : string;
    listElements:SmartFieldType[]
}

const MedicalHistoryAI: React.FC<MedicalHistoryAIProps> = ({ formValues, uuidInvestigation, listElements, type, template, updateElement }) => {
    const [generatedText, setGeneratedText] = React.useState<string | null>(null);
    const [propmt, setPrompt] = React.useState<string | null>(null);
    const [sendToEmail, setSendToEmail] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openaiResponse, setOpenaiResponse] = React.useState<any>(null);

    useEffect(() => {
        if(template){
            actOnText();
        }
    }, [formValues]);



    function actOnText (){
        if(type === "medical_history_ai"){
            prepareText();
        }
        else{
            replaceFields();
        }
    }
    function replaceFields(){
        if(template && updateElement){  

            Object.values(formValues).forEach((field) => {
                console.log(field.label+" found "+template?.search("$"+field.label+"$"));
                template = template?.replace("$"+field.label+"$",JSON.stringify(field.value));
            });
            const prompt = Object.values(formValues).map((field) => field.label+":"+JSON.stringify(field.value)).join("");
            console.log(prompt);
            setGeneratedText(template);
            updateElement(0, {
                medical_history_ai: template,
            });
        }
    }
    function prepareText() {
        if(template && updateElement){  
            const valuesString = Object.values(formValues).map((field) => {
                let value = field.value;
                if(Array.isArray(field.value)){
                    value = JSON.stringify(field.value);
                }
                return `"${field.label} : ${value}"`
            }).join("; ");
            let prompt = ""
            if(template.includes("$FORM_DATA$")){
                prompt = template.replace("$FORM_DATA$", +"\n"+valuesString);
            }
            else{
                prompt = template+"\n"+valuesString;
            }
            
            console.log(valuesString);
            
            
            setPrompt(prompt);
        }
    }
    function sendTextToOpenAI(){
        if(updateElement){
            setLoading(true);
            axios.post(`${import.meta.env.VITE_APP_API_URL }/researcher/investigation/${uuidInvestigation}/openai`, {prompt:propmt}, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then((response) => {
                        setGeneratedText(response.data.response.choices[0].text);
                        updateElement(0, {
                            medical_history_ai : response.data.response.choices[0].text,
                            "medical_history_ai-send_email" : sendToEmail
                        });
                        setLoading(false);
                })
                .catch((error) => {
                    console.log(error); 
                    setLoading(false);
                });
            
            }
    }
    function renderCore(){
        if(loading){
            return (
                <Loader />
            )
        }
        else if(generatedText){
            return (
                <QuillWrapper>
                    <ReactQuill style={{fontSize:'24px'}}
                        value={generatedText}
                        onChange={(newValue, delta, source) => {
                            if (source === 'user' && updateElement) {
                                setGeneratedText(newValue);
                                updateElement(0, {
                                    "medical_history_ai" : newValue,
                                    "medical_history_ai-send_email" : sendToEmail
                                });
                            }
                        }}
                        onBlur={(range, source, quill) => {
                            //input.onBlur(quill.getHTML());
                        }}
                    />
                </QuillWrapper>
            )
        }
       
    }
    return (
        <Box mt={3} mb={3} >
            <Grid container spacing={2} style={{paddingBottom:'1rem'}}>
                <Grid xs={12}>
                    {
                        type !== "medical_history_template" &&
                        <ButtonCheck disable={generatedText} onClick={sendTextToOpenAI}>
                            <Translate id="hospital.generate_medical_history" />
                        </ButtonCheck>
                    }
                    
                    &nbsp;
                    {
                        type === "medical_history_ai" &&
                        <FormControlLabel
                            control={<Checkbox checked={sendToEmail} onChange={(event) =>{
                                console.log(event.target.checked+"ll");
                                if(updateElement){
                                    updateElement(0, {
                                        medical_history_ai : generatedText ? generatedText : "",
                                        "medical_history_ai-send_email" : event.target.checked
                                    });
                                }
                                
                                setSendToEmail(event.target.checked);
                            } } />}
                            label={<Translate id="hospital.send_to_email" />}
                        />
                    }
                    
                </Grid>
            </Grid>
            {
                renderCore()
            }
            
            {/* <div style={{paddingTop:'1rem'}}>
                <ButtonSave onClick={() => console.log("Save!")}>Save </ButtonSave>
            </div> */}
        </Box>
    );
};

export default MedicalHistoryAI;
