import React from 'react';
import DataCollection from '../../../components/investigation/create/data_collection'
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';
import { edc_data1 } from '../../example_data';

export default {
    title: 'Investigation/Create/DataCollection',
    component: DataCollection,
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <DataCollection {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback DataCollection", JSON.stringify(values));alert(JSON.stringify(values))}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : { sections: edc_data1().surveys[0].sections} ,
    callBackData : (values) => {console.log("Callback DataCollection", JSON.stringify(values));alert(JSON.stringify(values))}
};


