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

// Cypress.Commands.add('login', () => {
    
//     // Используйте переменные окружения из файла .env
//     cy.get('#UserID').type(Cypress.env('username'));
//     cy.get('#Password').type(Cypress.env('password'));
  
//     cy.get('form').submit();
//   });

import LoginPage from '../page-objects/LoginPage';

  Cypress.Commands.add('login', () => {

    const loginPage=new LoginPage()
    cy.visit('https://mailfence.com/')
    loginPage.getLogInButton().click()
    cy.get('#UserID').type(Cypress.env('username'));
    cy.get('#Password').type(Cypress.env('password'));
    cy.get('.btn').click()
  });

  Cypress.Commands.add('login', () => {

    const loginPage=new LoginPage()
    loginPage.getLogInButton().click()
    cy.get('#UserID').type(Cypress.env('username'));
    cy.get('#Password').type(Cypress.env('password'));
    cy.get('.btn').click()
  });

  