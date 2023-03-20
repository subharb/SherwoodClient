import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { isString } from 'lodash';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import ReactQuill from 'react-quill';
import { PropsSmartField } from '.';
import axios from '../../../utils/axios';
import Loader from '../../Loader';
import { QuillWrapper } from '../FieldSherwood';
import { ButtonCheck, ButtonContinue, ButtonSave } from '../mini_components';

interface MedicalHistoryAIProps extends PropsSmartField {
    formValues : {[key:string]:{label:string,value:string}};
    uuidInvestigation : string;
}

const MedicalHistoryAI: React.FC<MedicalHistoryAIProps> = ({ formValues,uuidInvestigation, type, template, updateElement }) => {
    const [generatedText, setGeneratedText] = React.useState<string | null>(null);
    const [sendToEmail, setSendToEmail] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    
    useEffect(() => {
        if(template){
            actOnText();
        }
    }, []);

    function actOnText (){
        if(type === "medical_history_ai"){
            sendToOpenAI();
        }
        else{
            replaceFields();
        }
    }
    function replaceFields(){
        if(template && updateElement){  

            Object.values(formValues).forEach((field) => {
                console.log(field.label+" found "+template?.search("$"+field.label+"$"));
                template = template?.replace("$"+field.label+"$",field.value);
            });
            const prompt = Object.values(formValues).map((field) => field.label+":"+JSON.stringify(field.value)).join("");
            console.log(prompt);
            setGeneratedText(template);
            updateElement(0, {
                medical_history : template,
                send_email : sendToEmail
            });
        }
    }
    function sendToOpenAI() {
        if(template && updateElement){  
            
            const valuesString = Object.values(formValues).map((field) => field.label+":"+JSON.stringify(field.value)).join(", ");
            console.log(valuesString);
            const prompt = template+"\n"+valuesString;
            setGeneratedText(prompt);

            axios.post(`${process.env.REACT_APP_API_URL }/researcher/investigation/${uuidInvestigation}/openai`, {prompt}, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then((response) => {
                        setGeneratedText(template+"\n"+valuesString+"\n"+response.data.choices[0].text);
                        updateElement(0, {
                            medical_history : response.data.choices[0].text,
                            send_email : sendToEmail
                        });
                })
                .catch((error) => {
                    console.log(error);
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
                                    medical_history : newValue,
                                    send_email : sendToEmail
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
                        <ButtonCheck disable={generatedText} onClick={() => actOnText()}>
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
                                        medical_history : generatedText ? generatedText : "",
                                        send_email : event.target.checked
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
