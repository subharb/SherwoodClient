import React from 'react';
import { Provider } from 'react-redux';
import Sections from '../components/investigation/create/sections'
import Form from '../components/general/form';
import Field from '../components/general/FieldSherwood';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const FIELDS_FORM = {
    "checkbox":{
        required : false,
        type:"checkbox",
        label:"Checkbox",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "text" : {
        required : true,
        type:"text",
        label:"Textfield",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "select" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "Simple Select",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.survey.choose", "value" : ""},
        options:[{"text" : "Option 1", "value" : "text"},
                {"text": "Option 2", "value" : "number"},
                {"text": "Option 3", "value" : "checkbox"},
        ]                             
    },
    "select-activate" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "Select With activation field Option 2, 3",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.survey.choose", "value" : ""},
        options:[{"text" : "Option 1", "value" : "text"},
                {"text": "Option 2", "value" : "number"},
                {"text": "Option 3", "value" : "checkbox"},
        ],
        activationValues : ["checkbox", "number"],
        activatedFields:[
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.survey.choose",
                shortLabel: "investigation.table.type"
            },
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.survey.choose",
                shortLabel: "investigation.table.type"
            }]
                                        
    }
}



export default {
  title: 'Fields',
  component: Form,
  decorators: [story => 
                <Provider store={store}>
                    <LocalizeProvider initialize={{
                        languages: [
                        { name: "English", code: "en" },
                        { name: "Spanish", code: "es" }
                        ],
                        translation: globalTranslations,
                        options: {
                        defaultLanguage: "en",
                            renderToStaticMarkup: renderToStaticMarkup
                        }
                    }}>
                        {story()}
                    </LocalizeProvider>
                </Provider>],
};

const Template = (args) => <Form {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    fields:FIELDS_FORM, 
    creating : true
};

