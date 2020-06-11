import React from 'react';
import { fireEvent,  } from '@testing-library/react';
import Form  from '../components/general/form';

import { FIELDS, renderWithRedux } from './helpers';

test('Form validates inputs', () => {
    
    const onSubmitFn = jest.fn();
    const formComponent = renderWithRedux(
        <Form fields={FIELDS} callBackForm={onSubmitFn} />
    );
    
    //Doy a submit y deberá mostrar un error porque el form está vacío
    const submitButton = formComponent.getByTestId("submit-form");
    fireEvent.click(submitButton);
    //No se debe llamar porque no hay datos válidos
    expect(onSubmitFn.mock.calls.length).toBe(0);

    //Meto datos de prueba correctos en el form
    Object.keys(FIELDS).map(key => {
        let field = FIELDS[key];
        const fieldInput = formComponent.getByTestId(key);
        //Este click es para el checkbox, sino no se inicializa, pero no afecta al resto de inputs
        fireEvent.click(fieldInput); 
        fireEvent.change(fieldInput, {
            target: { value: field.value }
        }); 
    });
    
    fireEvent.click(submitButton);
    expect(onSubmitFn.mock.calls.length).toBe(1);
    expect(formComponent).toMatchSnapshot();
    // //Al dar submit es correcto
    // form.simulate('submit');
    // expect(onSubmitFn).toHaveBeenCalledTimes(2);
    // //No me convence el resultado porque debería devolver los valores introducidos.
    // expect(onSubmitFn.mock.results).toEqual([{"type": "return", "value": {}}, {"type": "return", "value": {}}]);

    
  });