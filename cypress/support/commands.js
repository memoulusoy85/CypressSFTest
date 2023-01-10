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

   // cy.visit('/login')

   cy.visit('https://paneltest.sellerflash.com/login')

   //cy.visit('paneltest.sellerflash.com/login')
    
    cy.get('#username').clear().type(username)
    cy.get('#password').clear().type(password)
    cy.get(':nth-child(1) > .p-button > .p-button-label').click()

    cy.wait(2000)

    cy.get('b').should('be.visible')

    cy.wait(1000)


      cy.get('body').then((htmlBody)=> {

        if(htmlBody.find('[class*="turkishFlag"]').length>0){   // if this element is exist

            cy.get('[class*="turkishFlag"]').click()

            cy.wait(3000)

        }else{

            cy.get('[class*="englishFlag"]').click()
            cy.wait(1000)
            cy.get('[class*="turkishFlag"]').click()
            cy.wait(1000)

        }

    })

   

})

Cypress.Commands.add('Right_Username_Wrong_Password_Testing',()=>{

    cy.visit('https://paneltest.sellerflash.com/login')
    //cy.visit('/login')
    
    cy.get('#username').clear().type(username)
    cy.get('#password').clear().type(wrongPassword)
    cy.get(':nth-child(1) > .p-button > .p-button-label').click()

    cy.get('[class="p-inline-message-text"]').invoke('text').should('eq','Username or Password wrong !!! ')


})

//just add by panel, not for checking in Queue or not
Cypress.Commands.add('Add_ASIN_By_Panel',(asin)=>{    

    cy.visit('https://paneltest.sellerflash.com/inventory/new')
    
   // cy.get('#asinlist').clear().type('B07BTLL99G')
    cy.get('#asinlist').clear().type(asin)
    cy.contains('Add Queue').click()
    cy.contains('Done').click()

    cy.get('[class="p-toast-detail"]').invoke('text').should('eq','Record added.')


})



