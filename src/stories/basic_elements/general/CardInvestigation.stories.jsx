import React from 'react';
import CardInvestigation from '../../../components/investigation/show/all/card_investigation';
import ProviderSherwood from '../../../providerSherwood';


export default {
    title: 'Basic Elements/General/CardInvestigation',
  component: CardInvestigation,
  argTypes: {
    title: { control: "string" },
    description : { control: "string" },
    textUrl : { control: "string"},
    status : { control: "number"}
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const testStages = ["investigation.create.steps.basic_info", "investigation.create.steps.sections", "investigation.create.steps.patient_sheet" ];

const Template = (args) => <CardInvestigation {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title : "My first investigation",
    description : "This is a short description of My first investigation",
    textUrl : "Go to investigation",
    status : 0,
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};