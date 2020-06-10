import React from 'react';
import CreateInvestigation from '../components/investigation/create';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import axios from 'axios';
import {render, cleanup} from '@testing-library/react';
import { shallow,  mount, configure } from 'enzyme';


const TEST_INVESTIGATION = [
    {name : "edad", type : "text", question : "¿cúal es tu edad", "is_personal_data" : true},
    {name : "address", type : "text", question : "¿cúal es tu dirección", "is_personal_data" : true},
    {name : "hemo", type : "number", question : "valor de hemoglobina", "is_personal_data" : false},
]
const mockStore = configureStore();
const store = mockStore();

configure({adapter: new Adapter()});


test('Add a new field to the investigation', () => {

    const createInvestigationTest = mount(
        <Provider store={store}>
            <CreateInvestigation />
        </Provider>
    );
    //Por cada campo de la investigación
    for(let i = 0; i < TEST_INVESTIGATION.length;i++){
        //Pincho en el botón de add-field
        console.log("Inserto campo");
        let dataField = TEST_INVESTIGATION[i];
        createInvestigationTest.find('.add-field').simulate('click');
        //Meto datos en el Form de add-field
        Object.keys(dataField).map(key => {
            createInvestigationTest.find('.save-field').value = dataField[key];
        });
        //Guardo los datos
        createInvestigationTest.find('.add-field').simulate('click');
    }
    //Envío los datos al servidor
    const fakeResponse = {title:"Test"};

    jest.spyOn(axios, "post").mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse)
      };
      return Promise.resolve(fetchResponse);
    });
    createInvestigationTest.find('#save-investigation').simulate('click');
    //Compruebo que el elemento success existe
    expect(createInvestigationTest.find('.success').children()).toHaveLength(1);
});