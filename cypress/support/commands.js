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
import PageBody from '../page-objects/PageBody';

// Command#1 of identifing the fields and logining 
  Cypress.Commands.add('login', () => {

    const loginPage=new LoginPage()
    cy.visit('https://mailfence.com/')
    loginPage.getLogInButton().click()
    cy.get('#UserID').type(Cypress.env('username'));
    cy.get('#Password').type(Cypress.env('password'));
    cy.get('.btn').click()
  });
// Command#2 of checking if the test on the email tab (need to rework with some POMs and removing the WAITs)
  Cypress.Commands.add('checkIfOnMailTab', () => {

    const pageBody=new PageBody()
    cy.wait(5000)
    
    pageBody.getPageBody.then((body) => {
      const countOfElementsInBody = body.find('.listSubject').length;
      cy.wait(5000)
      if (countOfElementsInBody > 0) {
          cy.get('#mailNewBtn').click();
          cy.log('FOUND')}
       else {
        cy.get('.icon24-Message').click();
        cy.log('NOTFOUND')
      }
  });

})

Cypress.Commands.add('generateAttachment', (filePath, attachmentName, attachmentExtension, attachmentText)=> { 
  cy.writeFile(`${filePath}\\${attachmentName}.${attachmentExtension}`, `${attachmentText}`);
  cy.readFile(`${filePath}\\${attachmentName}.${attachmentExtension}`).should("not.be.null");
})

Cypress.Commands.add("uploadNewDocumentOnDocumentPage", (path, id) => {
  cy.fixture('test1_test_data.json').then((testData) => {
    const filePath = testData.filePath;
    const attachmentName = testData.attachmentName;
    const attachmentExtension = testData.attachmentExtension;
    const attachmentText = testData.attachmentText;

    const url = `https://mailfence.com/sw?type=gwtmail&state=71&v=2_5&oidMessage=${id}`;
    cy.readFile(`${filePath}/${attachmentName}.${attachmentExtension}`).then((fileContent) => {
      cy.request({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          file: {
            value: fileContent, // Используйте содержимое файла
            options: {
              filename: `${attachmentName}.${attachmentExtension}`,
              contentType: `application/${attachmentExtension}`,
            },
          },
          // Добавьте другие параметры запроса по необходимости
        },
      }).then((response) => {
        // Проверки на ответ
        expect(response.status).to.eq(200); // Проверьте статус HTTP-запроса
        // Добавьте другие проверки по необходимости
      });
    });
  });
});