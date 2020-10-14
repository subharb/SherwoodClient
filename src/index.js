import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { LocalizeProvider } from "react-localize-redux";
import globalTranslations from "./translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './components/home';
import Login from './components/dashboard/login';
import RegisterUser from './components/register';
import Dashboard from './components/dashboard';
import { ThemeProvider }  from 'styled-components';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Form from './components/general/form';
import Section from './components/investigation/create/sections';

const store = createStore(reducers, {}, applyMiddleware(thunk));
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');

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

ReactDom.render(
    <Provider store={store}>
        <ThemeProvider theme={{colorSherwood:"#26a69a", headerBackground:"#059688"}}>
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
                <BrowserRouter>
                    <Switch>
                        
                            <Route exact path="/:type(patient|researcher)/login" children={(props) => <Login {...props} /> } />
                            <Route exact path="/:type(patient|researcher)/register/:uuidPatient?" children={(props) => <RegisterUser {...props} /> } />
                            <Route exact path="/dashboard" children={(props) => <Dashboard {...props} /> } />
                            <Route exact path="/investigation/:action/:uuid?" children={(props) => <Dashboard {...props} /> } />
                            <Route exact path="/" children={(props) => <Home {...props} />} />
                            <Route exact path="/test" children={(props) => <Section {...props} />} />
                            <Route exact path="/test2" children={(props) => <Form fields={FIELDS_FORM} creating={true} {...props} />} />
                        
                    </Switch>
                </BrowserRouter>
            </LocalizeProvider>
        </ThemeProvider>
    </Provider>, document.getElementById('root')
);