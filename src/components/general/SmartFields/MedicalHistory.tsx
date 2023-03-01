import { Box, Grid, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';
import { Translate } from 'react-localize-redux';
import ReactQuill from 'react-quill';
import { PropsSmartField } from '.';
import { QuillWrapper } from '../FieldSherwood';
import { ButtonCheck, ButtonContinue, ButtonSave } from '../mini_components';

interface MedicalHistoryAIProps extends PropsSmartField {
    formValues : any;
}

const MedicalHistoryAI: React.FC<MedicalHistoryAIProps> = ({ formValues }) => {
    const [generatedText, setGeneratedText] = React.useState<string | null>(null);
    
    return (
        <Box mt={3} mb={3} >
            <Grid container spacing={2} style={{paddingBottom:'1rem'}}>
                <Grid xs={12}>
                    <ButtonCheck onClick={() => console.log("medical history", formValues)}>
                        <Translate id="hospital.generate_medical_history" />
                    </ButtonCheck>
                    &nbsp;
                    <ButtonContinue color={blue[500]} onClick={() => console.log("enviar email")}>
                        <Translate id="hospital.send_to_email" />
                    </ButtonContinue>
                </Grid>
            </Grid>
            {
                generatedText &&
                <QuillWrapper>
                    <ReactQuill style={{fontSize:'24px'}}
                        onChange={(newValue, delta, source) => {
                            // if (source === 'user') {
                            // input.onChange(newValue);
                            // }
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
