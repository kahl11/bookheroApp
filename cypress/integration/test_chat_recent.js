// test_chat_recent.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Test Recent Chat Page', () => {
  it('Verifies Recent chat info is rendered correctly', () => {
    cy.visit('http://localhost:19006/')
    cy.wait(1000)

    //Login to Account
    cy.contains('Login').click()
  
    cy.get('input').eq(1).type('nmaka', {force: true})
    cy.get('input').eq(2).type('qwerty', {force : true})
    cy.contains('Login').click()

    //Go to Chats Page
    cy.contains('Chats').click()

    //Send Message
    cy.contains('kahl11').click()
    cy.get('input').type('Hello World!', {force: true})
    cy.contains('Send').click()
    cy.wait(500)

    //Return to Chats Page
    cy.reload()
    cy.contains('Chats').click()

    //Verify Message Appears as Recent Chat
    cy.contains('Hello World!')

    //Send Message 2
    cy.contains('kahl11').click()
    cy.get('input').type('Bye World!', {force: true})
    cy.contains('Send').click()
    cy.wait(500)


    //Return to Chats Page
    cy.reload()
    cy.contains('Chats').click()

    //Verify Message 2 Appears as Recent Chat
    cy.contains('Bye World!')
  })
})