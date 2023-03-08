import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { isString } from 'lodash';
import React from 'react';
import { Translate } from 'react-localize-redux';
import ReactQuill from 'react-quill';
import { PropsSmartField } from '.';
import { QuillWrapper } from '../FieldSherwood';
import { ButtonCheck, ButtonContinue, ButtonSave } from '../mini_components';

interface MedicalHistoryAIProps extends PropsSmartField {
    formValues : {[key:string]:{label:string,value:string}};

}

const MedicalHistoryAI: React.FC<MedicalHistoryAIProps> = ({ formValues, template, updateElement }) => {
    const [generatedText, setGeneratedText] = React.useState<string | null>(null);
    const [sendToEmail, setSendToEmail] = React.useState<boolean>(false);
    
    function sendToOpenAI() {
        if(template && updateElement){  

            Object.values(formValues).forEach((field) => {
                console.log(field.label+" found "+template?.search("$"+field.label+"$"));
                template = template?.replace("$"+field.label+"$",field.value);
            });
            const prompt = Object.values(formValues).map((field) => field.label+":"+JSON.stringify(field.value)).join("");
            console.log(prompt);
            setGeneratedText(template);
            updateElement(0, {
                medical_history_ai : template,
                send_email : sendToEmail
            });
        }
                                        
    }
    return (
        <Box mt={3} mb={3} >
            <Grid container spacing={2} style={{paddingBottom:'1rem'}}>
                <Grid xs={12}>
                    <ButtonCheck disable={generatedText} onClick={() => sendToOpenAI()}>
                        <Translate id="hospital.generate_medical_history" />
                    </ButtonCheck>
                    &nbsp;
                    <FormControlLabel
                        control={<Checkbox checked={sendToEmail} onChange={(event) =>{
                            console.log(event.target.checked+"ll");
                            if(updateElement){
                                updateElement(0, {
                                    medical_history_ai : generatedText ? generatedText : "",
                                    send_email : event.target.checked
                                });
                            }
                            
                            setSendToEmail(event.target.checked);
                        } } />}
                        label={<Translate id="hospital.send_to_email" />}
                    />
                </Grid>
            </Grid>
            {
                generatedText &&
                <QuillWrapper>
                    <ReactQuill style={{fontSize:'24px'}}
                        value={generatedText}
                        onChange={(newValue, delta, source) => {
                            if (source === 'user' && updateElement) {
                                setGeneratedText(newValue);
                                updateElement(0, {
                                    medical_history_ai : newValue,
                                    send_email : sendToEmail
                                });
                            }
                        }}
                        onBlur={(range, source, quill) => {
                            //input.onBlur(quill.getHTML());
                        }}
                    />
                </QuillWrapper>
            }
            
            {/* <div style={{paddingTop:'1rem'}}>
                <ButtonSave onClick={() => console.log("Save!")}>Save </ButtonSave>
            </div> */}
        </Box>
    );
};

export default MedicalHistoryAI;
