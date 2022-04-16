describe('Test New Post Widgit', () => {
    it('go to the homescreen', () => {
      cy.viewport('iphone-6')
      cy.clearCookies()
      cy.visit('http://localhost:19006/')
      cy.wait(1000)

      cy.get('[data-testid=post-name-0').should('be.visible');
      cy.get('[data-testid=post-name-1').should('be.visible');
    })
  })
  