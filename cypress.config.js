/// <reference types="Cypress" />


const { defineConfig } = require("cypress");

module.exports = defineConfig({


  

  projectId: "4w1pmh",     // github-->CypressSFDashboard Integration

// These settings apply everywhere unless overridden
pageLoadTimeout: 6000,

defaultCommandTimeout: 4000,
//viewportWidth: 1000,
//viewportHeight: 600,

 viewportWidth: 1920,
 viewportHeight: 1080,


// Viewport settings overridden for component tests
component: {
  viewportWidth: 500,
  viewportHeight: 500
},

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },


    baseUrl:"https://paneltest.sellerflash.com",
   
    testIsolation:true,

    experimentalSessionAndOrigin: true
    

  },
});
