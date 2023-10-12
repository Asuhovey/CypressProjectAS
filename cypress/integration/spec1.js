describe('Test Spec', () => {
    it('Should login and send email to itself and something else...', () => {
      cy.visit('https://mailfence.com/')
      let nineCharacters;
      

      cy.fixture('test1_test_data').then(function(data) {
        this.data = data;
        const filePath = this.data.filePath;
        const attachmentName = this.data.attachmentName;
        const attachmentExtension = this.data.attachmentExtension;
        
        cy.generateAttachment(this.data.filePath, this.data.attachmentName, this.data.attachmentExtension, this.data.attachmentText);
     })

      cy.login()
      //cy.checkIfOnMailTab()
  
      cy.wait(2000)
      cy.intercept({ method: 'POST', url: '**/gwt' }).as('responseRole')

// after intercept you can click the button
cy.get('#mailNewBtn').should('have.text', 'New').click()
cy.wait(2000)

// and wait for cypress to get the result as alias
cy.wait('@responseRole').then(({ request, response }) => {
  cy.log(response.body)
  const text = response.body
  const match = text.match(/\/Temp","(.{9})/);

if (match) {
  nineCharacters = match[1];
  cy.log(nineCharacters); // Выведет 9 символов после "/Temp","
} else {
  cy.log("Соответствие не найдено.");
}

//Это регулярное выражение ищет текст "/Temp"," и затем захватывает следующие 9 символов в группу за счет (.{9}). Если соответствие найдено, то nineCharacters будет содержать эти 9 символов



}).then(() => {
  cy.wait(2000)
  cy.get('#mailSend > .btnCtn').should('have.text', 'Send');
  cy.get('.GCSDBRWBKSB > :nth-child(2)').click();
  cy.log('id isss ' + nineCharacters);
  cy.uploadNewDocumentOnDocumentPage("${filePath}\\${attachmentName}.${attachmentExtension}",nineCharacters);
  });
})
})
  