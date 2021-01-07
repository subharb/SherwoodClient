import { personal_data1, edc_data1, basic_info1 } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Introduces info on each field', () => {
        //cy.visit('http://localhost:6006/iframe.html?id=pages-new-investigation--basic&viewMode=story')
        cy.visit('http://localhost:3000/investigation/create');
        //cy.visit('https://dashboard.sherwood.science/');

        
        cy.loginResearcher();

        cy.contains('Create investigation').click();


        //Introducimos datos de BASIC INFO
        cy.createBasicInfo(basic_info1());

        personal_data1().forEach(pField => {
            cy.contains(pField, {matchCase: false}).click();    
        });
           
        cy.get('button[data-testid="continue"]')
            .click();

        cy.createEDC(edc_data1().surveys);
        
        cy.get('button[data-testid="publish-investigation"]')
        .click();    

        
        //Introducimos datos de Sección de datos personales

        
        // const currentFields = summary_info1().basic_info;
        // const currentKeys = Object.keys(currentFields);
        // for(let i = 0; i < currentKeys.length; i++){
        //     const keyField = currentKeys[i];
            
        //     cy.get('input[name="'+keyField+'"]')
        //         .then(($input) => {
        //             console.log($input);
        //             if ($input.hasClass('MuiInputBase-input MuiInput-input')) {
        //                 return 'input';
        //             }
        //             return 'select';
        //         })
        //         .then((selector) => {
        //             // selector is a string that represents
        //             // the selector we could use to find it
        //             if(selector === 'input'){
        //                 cy.get('input[name="'+keyField+'"]')
        //                     .type(currentFields[keyField])
        //                     .should('have.value', currentFields[keyField]);
        //             }
        //             else{
        //                 cy.get('[aria-labelledby^="'+keyField+'"]')
        //                     .click()
        //                     cy.contains(currentFields[keyField]).click();
        //             }
        //           })

        // }        
        
    })
})