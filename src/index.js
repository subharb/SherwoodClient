import React from 'react';
import ReactDom from 'react-dom';
import ProviderSherwood from './providerSherwood';
import axios from 'axios';
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



const store = createStore(reducers, {}, applyMiddleware(thunk));
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');

const FIELDS_FORM = {
    "encrypted":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.edc.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"text" : "investigation.create.edc.type_text", "value" : "text"},
                {"text": "investigation.create.edc.type_number", "value" : "number"},
                {"text": "investigation.create.edc.checkbox", "value" : "checkbox"}, 
                {"text": "investigation.create.edc.type_date", "value" : "date"},
                {"text": "investigation.create.edc.dropdown", "value" : "dropdown"},
                {"text": "investigation.create.edc.multioption", "value" : "multioption"}
        ],
        activationValues : ["dropdown", "multioption"],
        activatedFields:[
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            }]
                                        
    },
    "label" : {
        required : false,
        type:"text",
        label : "investigation.create.edc.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

ReactDom.render(
    <ProviderSherwood>
            <Switch>
                <Route exact path="/:type(patient|researcher)/login" children={(props) => <Login {...props} /> } />
                <Route exact path="/:type(patient|researcher)/register/:uuidPatient?" children={(props) => <RegisterUser {...props} /> } />
                <Route exact path="/dashboard" children={(props) => <Dashboard /> } />
                <Route exact path="/investigation/:action/:uuid?" children={(props) => <Dashboard action={props.match.params.action} uuid={props.match.params.uuid} /> } />
                <Route exact path="/" children={(props) => <Home {...props} />} />
            </Switch>
    </ProviderSherwood>, document.getElementById('root')
);