import React from 'react';
import { Provider } from 'react-redux';
import Header from '../components/general/header';
import Form from '../components/general/form';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const FIELDS_FORM = {
    "is_personal_data":{
        required : false,
        type:"checkbox",
        label:"investigation.create.survey.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.survey.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.survey.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.survey.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.survey.choose", "value" : ""},
        options:[{"text" : "investigation.create.survey.type_text", "value" : "text"},
                {"text": "investigation.create.survey.type_number", "value" : "number"},
                {"text": "investigation.create.survey.checkbox", "value" : "checkbox"}, 
                {"text": "investigation.create.survey.type_date", "value" : "date"},
                {"text": "investigation.create.survey.dropdown", "value" : "dropdown"},
                {"text": "investigation.create.survey.multioption", "value" : "multioption"}
        ],
        activationValues : ["dropdown", "multioption"],
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
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.survey.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}



export default {
  title: 'Sections',
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

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    fields:{FIELDS_FORM}, 
    creating : true
};

