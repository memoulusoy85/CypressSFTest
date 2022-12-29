describe('Login page Smoke Test',()=>{


it('Add_ASIN_By_Panel_Test', () => {

    cy.Login_Positive_Scenario()
    cy.Add_ASIN_By_Panel()
    
});





})