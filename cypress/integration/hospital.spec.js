import { researcherA_data, loginResearcherA, loginResearcherB, loginResearcherC,
    researcherB_data, basic_info1, personal_data_investigation1, edc_data1, researcherC_data, records_patient1, records_patient2, researcherD_data, loginResearcherD } from '../../src/stories/example_data';

import { URL_BASE } from "../support";

describe('Testing Hospital Features', () => {
    context('iphone-5 resolution', () => {
        beforeEach(() => {
          // run these tests as if in a mobile browser
          // and ensure our responsive UI is correct
          cy.viewport('iphone-5')
        })
        it('Doctor signs in', () => {
            cy.visit(URL_BASE+'/auth/sign-in');
            //cy.visit('https://dashboard.sherwood.science/');
            cy.loginResearcher(loginResearcherA);
            
        })   
    })
});