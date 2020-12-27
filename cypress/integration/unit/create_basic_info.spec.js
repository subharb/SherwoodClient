

describe('Testing Create Basic Info', () => {
    it('Introduces info on each field', () => {
        cy.visit('http://localhost:6006/iframe.html?id=investigation-create-basic-info--basic&viewMode=story');
        cy.createBasicInfo();
    })
})