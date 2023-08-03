import React from 'react';
import { expect, test, vi } from 'vitest'
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen, act, within } from '@testing-library/react';
import { AddPatientComponent } from './View';
import { CustomThemeProvider } from '../../../themeProvider';
import ProviderSherwood from '../../../providerSherwood';
import { personal_data_investigation1 } from '../../../stories/example_data';


export async function setValue(input, value, getByRole){
    if(input.outerHTML.includes('type="text"')){
        await act(async () => { 
            fireEvent.change(input, { target: { value: value } }); 
        });
    }   
    else{ 
        fireEvent.mouseDown(input);
        const listbox = within(getByRole('listbox'));
        fireEvent.click(listbox.getByText(new RegExp(value, "g")));
    } 
}

describe('AddPatientComponent', () => {
    const mockInvestigations = { loading: false, currentInvestigation: { permissions: [] } };
    const mockPatients = { loading: false, data:[] };
    const mockPatientsInvestigation = [];
    const mockPersonalFields =  [
        
        {
            "name": "name",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.name",
            "encrypted": true
        },
        {
            "name": "surnames",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.surname",
            "encrypted": true
        },
        {
            "name": "email",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.email",
            "encrypted": true
        },
        {
            "name": "sex",
            "type": "select",
            "required": true,
            "label": "investigation.create.personal_data.fields.sex",
            "options": [{
                value:"Female",
                label:"Female"
            },
            {
                value:"Male",
                label:"Male"
            }],
            "encrypted": true
        },
        {
            "name": "phone",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.phone",
            "encrypted": true
        },
        {
            "name": "health_id",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.health_id",
            "encrypted": true
        }
    ];
    const mockKeyResearcherInvestigation = {};
    const mockInsurances = [{
        id: 1,
        name: "Insurance 1",        
      },{
        id: 2,
        name: "Insurance 2",
      }, 
      {
        id: 3,
        name: "Insurance 3",
      }];
    const mockSavePatientFunction = vi.fn();

    const mockFieldValues = [{"label" : "Name", "value" : "David"}, {"label" : "Surname", "value" : "Shaikh"},
                            {"label" : "Sex", "value" : "Male"} ,  {"label" : "Select the patient's insurance", "value" : "Insurance 2"} ,
                            {"label" : "Email", "value" : "dshaikhurbina@gmail.com"},
                        ]

    it('should fail if the form is empty',async () => {
        const {getByLabelText, getByTestId, debug} = render(
            <ProviderSherwood>
                <AddPatientComponent
                    investigations={mockInvestigations}
                    patient={null}
                    patients={mockPatients}
                    patientsInvestigation={mockPatientsInvestigation}
                    personalFields={mockPersonalFields}
                    keyResearcherInvestigation={mockKeyResearcherInvestigation}
                    insurances={mockInsurances}
                    callbackGotoPatient={() => console.log("Go to patient")}
                    callbackSavePatient={() => console.log("Save to patient")}
                />
        </ProviderSherwood>);
        
        // const input = getByLabelText('Name'); // Select the input element by its label

        // fireEvent.change(input, { target: { value: 'HOLAA' } }); // Simulate the user entering text

        const submitButton = getByTestId('submit-button-form'); // Select the button element by its custom test ID

        await act(async () => {
            fireEvent.click(submitButton); // Simulate the user clicking on the button
          });
        
        // Your testing assertions here 
        console.log("PRE debug")
        //screen.debug();
        const errorMessages = screen.getAllByText(/This field can' be empty/i);
        expect(errorMessages.length).toBe(2);

    });

    it('should return values if the form is correct',async () => {
        const {getByLabelText, getByTestId, debug, getByRole} = render(
            <ProviderSherwood>
                <AddPatientComponent
                    investigations={mockInvestigations}
                    patient={null}
                    patients={mockPatients}
                    patientsInvestigation={mockPatientsInvestigation}
                    personalFields={mockPersonalFields}
                    keyResearcherInvestigation={mockKeyResearcherInvestigation}
                    insurances={mockInsurances}
                    callbackGotoPatient={() => console.log("Go to patient")}
                    callbackSavePatient={mockSavePatientFunction}
                />
        </ProviderSherwood>);
        
        for(let i = 0; i < mockFieldValues.length; i++){ 
            const mockField = mockFieldValues[i];
            console.log(mockFieldValues)
            const input = getByLabelText(mockField.label);
            
            if(input.outerHTML.includes('type="text"')){
                await act(async () => {
                    fireEvent.change(input, { target: { value: mockField.value } }); 
                });
            }    
            else{ 
                fireEvent.mouseDown(input);
                const listbox = within(getByRole('listbox'));
                fireEvent.click(listbox.getByText(new RegExp(mockField.value, "g")));
            }   
        } 
        //Insurances
        // const input = getByLabelText("Insurances");
        // setValue(input, "Insurance 1");  

        const submitButton = getByTestId('submit-button-form'); // Select the button element by its custom test ID

        await act(async () => {
            fireEvent.click(submitButton); // Simulate the user clicking on the button
        });
        
        // const errorMessages = screen.getAllByText(/This field can' be empty/i);
        // expect(errorMessages.length).toBe(2); 
       
        expect(mockSavePatientFunction).toHaveBeenCalledTimes(1);

    });

    
});