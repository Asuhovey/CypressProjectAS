describe('Test Spec', () => {
    it('Should login and send email to itself and something else...', () => {
      cy.visit('https://mailfence.com/')
      

      cy.fixture('fileAttachment').then(function(data) {
        this.data = data;
        const filePath = this.data.filePath;
        const attachmentName = this.data.attachmentName;
        const attachmentExtension = this.data.attachmentExtension;
        
        cy.generateAttachment(this.data.filePath, this.data.attachmentName, this.data.attachmentExtension, this.data.attachmentText);
     })

      cy.login()
      //cy.emailCompilation()
      //cy.pressSendButton()
      //cy.findTheLetterAndOpenIt()
      //cy.findReceivedDocumentAndSaveItToFiles()
      cy.openDocPage()
      cy.dragDocToTrash()

      cy.wait(5000)
      //cy.clearEnvironment()
      //cy.uploadNewDocumentOnEmailPage()
      //cy.checkIfOnMailTab()
  
//       cy.wait(2000)
//       cy.fixture("fileAttachment").then(function(data) {
//         this.data = data;
//         const filePath = this.data.filePath;
//         const attachmentName = this.data.attachmentName;
//         const attachmentExtension = this.data.attachmentExtension;
        
//         cy.wait(2000)
//         cy.get('.icon24-Documents').click();
//         cy.get('.GCSDBRWBCDC').click();
//         cy.uploadNewDocumentOnDocumentPage(`${filePath}//${attachmentName}.${attachmentExtension}`);
//   });
// })
})})