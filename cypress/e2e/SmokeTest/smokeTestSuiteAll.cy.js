
import {username,password,wrongUsername, wrongPassword  } from '../../support/authentication.constant';

var data=require('../../fixtures/testDataAsin.json')





describe('Login Page Test',()=>{


  it('Login Positive Test', () => {
  
      cy.Login_Positive_Scenario()
      
  });
  
  })



describe('Happy_Path Test Suite',()=>{


    before(() => {
        // runs once before all tests in the block
       // cy.clearCookies()
        
      })

      beforeEach(() => {

        cy.session('user', () => {
          cy.visit('/login');
          cy.get('#username').clear().type(username)
          cy.get('#password').clear().type(password)
          cy.get(':nth-child(1) > .p-button > .p-button-label').click()

          cy.wait(4000)

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

          
        });

      });


      describe('New ASIN Add and Delete Test',{testIsolation:false},()=>{     //testIsolation:false because just  after added verify, delete item

       
              //add asin and verify it is added in queue 
              it('Adding ASIN_By_Panel Test and verify It is in Queue', () => {        

                  cy.Add_ASIN_By_Panel(data.asinTestData[0])  // add new asin

                  cy.visit('https://paneltest.sellerflash.com/inventory?status=atQueue')
                  cy.wait(4000)
                  cy.get('[class="p-inputtext p-component"]').clear().type(data.asinTestData[0]).type('{enter}')  // search asin in Queue to If it is added
                  cy.get('[class="p-message-text"]>span').invoke('text').should('eq','1  products found by your filter search...') // verify 1 asin was found
              
               });


             it('Delete Asin from Queue and verify It is deleted', () => {   

                  //cy.visit('https://paneltest.sellerflash.com/inventory?status=atQueue')
                  // cy.get('[class="p-inputtext p-component"]').type(data.asinTestData[0]).type('{enter}') 
                  cy.get('tbody>tr>td>[class="p-checkbox p-component"]').click()
                  cy.contains('Choose Action').click()
                  cy.contains('Delete Selected').click()
                  cy.get('[class="p-button p-component p-button-success"]').click()

                  //verify It is deleted
                  cy.visit('https://paneltest.sellerflash.com/inventory?status=atQueue') // to clear inputbox otherwise class value change
                  cy.get('[class="p-inputtext p-component"]').clear().type(data.asinTestData[0]).type('{enter}') 
                  cy.get('[class="p-message-text"]>span').invoke('text').should('eq','0  products found by your filter search...') // verify asin deleted
              
    
          });
       
        
        })


   


   
    it('Pending Approval Filter Test', () => {

      cy.visit('/inventory?status=pendingApproval')
      cy.get('.fas.fa-filter').click()
      cy.scrollTo('top') 
      cy.get('[class="p-inputswitch p-component"]').first().click()   // checkbox 'Products I can be lowest'
      cy.get('[class="p-button p-component"]').first().click()       //search button
      cy.contains('products found by your filter search...').should('be.visible')
      
    });



    it('Delete from Pending Approval', () => {

      cy.visit('/inventory?status=pendingApproval')
      
      cy.wait(2000)


      cy.get('tbody>tr>td:nth-of-type(4)>div>div:nth-of-type(2)>a').first().then($el=>{

       // cy.wrap($e.text()).as('asin')

       // expect(asin).to.eq("B08ZS8W57M")

       return $el.text()

      })

        .then(asin=>{
              
            cy.get('tbody>tr>td:nth-of-type(8)>div').first().click()  //click ...
            cy.get('[class="p-menuitem-text"]').first().click()       // click delete
            cy.get('.p-button-success').click()                        // done

            cy.wait(2000)
            cy.visit('/inventory?status=pendingApproval')
    

              cy.get('[class="p-inputtext p-component"]').type(asin).type('{enter}')
              cy.wait(3000)

              cy.get('[class="p-message-text"]>span').invoke('text').should('eq','0  products found by your filter search...')


      })
      
      

   

    });


    
  

  after(() => {
    // runs once after all tests in the block

    cy.clearCookies()
  })
    
    })

    
  