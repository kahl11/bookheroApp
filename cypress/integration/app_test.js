describe('App General Tests', () => {
    it('go to the homescreen', () => {
      cy.visit('http://localhost:19006/');
      cy.get('[data-testid=header]')
      .invoke('text')
      .should('equal', 'Home');
    })
  })
  