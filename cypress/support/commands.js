// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



import {username,password,wrongUsername, wrongPassword  } from '../support/authentication.constant';

Cypress.Commands.add('Login_Positive_Scenario',()=>{

    cy.visit('https://paneltest.sellerflash.com/login')
    
    cy.get('#username').clear().type(username)
    cy.get('#password').clear().type(password)
    cy.get(':nth-child(1) > .p-button > .p-button-label').click()

    cy.get('b').should('be.visible')

})

Cypress.Commands.add('Right_Username_Wrong_Password_Testing',()=>{

    cy.visit('https://paneltest.sellerflash.com/login')
    
    cy.get('#username').clear().type(username)
    cy.get('#password').clear().type(wrongPassword)
    cy.get(':nth-child(1) > .p-button > .p-button-label').click()

    cy.get('[class="p-inline-message-text"]').invoke('text').should('eq','Username or Password wrong !!! ')

    


})

