describe('Test Spec', () => {
    it('Should login and send email to itself and something else...', () => {
      cy.visit('https://mailfence.com/')

      cy.login()
      // Выполним клик на элементе
      cy.get('.icon24-Documents').click();
      //cy.wait(4000)
      // if (cy.get('#treeInbox')) {
      //   cy.get('#mailNewBtn').click();
      // }  cy.get('.icon24-Message').click();
      cy.wait(10000)
      cy.get('body').then((body) => {
        const test = body.find('.listSubject').length;
        cy.wait(10000)
        if (test > 0) {
            cy.get('#mailNewBtn').click();
            cy.log('FOUND')}
         else {
          cy.get('.icon24-Message').click();
          cy.log('NOTFOUND')
        }
    });
  
      // Проверим, что элемент содержит ожидаемый текст
      cy.get('#myElement').should('have.text', 'Expected Text');
    });
  });
  