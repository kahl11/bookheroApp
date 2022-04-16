describe('Create Listing Tests', () => {
    it('go to the homescreen', () => {
      cy.clearCookies()
      cy.visit('http://localhost:19006/')
      cy.wait(3000)
      cy.get('[data-testid=listings-nav]', {timeout: 3000}).click({force: true, multiple:true})
      cy.get('[data-testid=create-listing]').click({force: true})
      cy.get('[data-testid=warning-text]')
      .invoke('text')
      .should('contain', 'WARNING');
    })
  })
  