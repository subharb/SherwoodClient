import React from 'react';
import NewInvestigation from '../components/investigation/create/index'
import ProviderSherwood from '../providerSherwood';

export default {
  title: 'Pages/New Investigation',
  component: NewInvestigation,
  argTypes: {
    step: { control: 'number' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <NewInvestigation {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    step : 0,
    initialData : {
        "investigation": {
            "basic_info": {
                "name": "COVID Nose ",
                "acronym": "CN",
                "type": "audit",
                "researcher": "Pedro Rodriguez",
                "institution": "Oxford University",
                "contact": "test@email.com",
                "ethics_body": "12345",
                "reference_number_state": "1"
            },
            "edc": {
                "sections" : [{
                        name:"Personal Data", repeats : false, 
                        fields : [{required : true, 
                                    is_personal_data:true, 
                                    name : "name", 
                                    question : "¿cual es tu nombre?", 
                                    type:"text"}
                                ]
                    },
                    {
                        "name": "analitica",
                        "repeats": false,
                        "fields": [{
                            "required": true,
                            "is_personal_data": true,
                            "name": "name",
                            "question": "Hemoglonbina",
                            "type": "number"
                        }]
                    }
                ]
            }
        },
        "addingSection": false,
        "editingIndexSection": false
    },
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


