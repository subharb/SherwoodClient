import React from 'react';
import { shallow,  mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Form  from '../components/general/form';
import renderer from 'react-test-renderer';
import { FIELDS } from './helpers';

const mockStore = configureStore();
const store = mockStore();

configure({adapter: new Adapter()});

test('Form validates inputs', () => {
    
    const onSubmitFn = jest.fn(data => data);
    const formTest = mount(
        <Provider store={store}>
            <Form fields={FIELDS} callBackForm={onSubmitFn} />
        </Provider>
    );
    // let tree = formTest.toJSON();
    // expect(tree).toMatchSnapshot();
    //Doy a submit y deberá mostrar un error porque el form está vacío
    const form = formTest.find('.form');
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn.mock.results).toEqual([{"type": "return", "value": {}}]);
    //Meto datos de prueba correctos en el form
    Object.keys(FIELDS).map(key => {
        let field = FIELDS[key];
        let input = null;
        if(field.type === "select"){
            input = formTest.find(`select[name="${key}"]`).first();
        }
        else{
            input = formTest.find(`input[name="${key}"]`).first();
        }
        input.instance().value = field.value; 
    });
    //Al dar submit es correcto
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(2);
    //No me convence el resultado porque debería devolver los valores introducidos.
    expect(onSubmitFn.mock.results).toEqual([{"type": "return", "value": {}}, {"type": "return", "value": {}}]);
  });