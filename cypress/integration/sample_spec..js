describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('http://localhost:3000/')

        cy.contains('type').click()

        // Should be on a new URL which includes '/commands/actions'
        cy.url().should('include', '/commands/actions')
    })
  })