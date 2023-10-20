describe('Test Spec', () => {

  
before(() => {
  cy.clearEnvironment()
})
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
    })
    it('Should open Documents page and upload the attachment via request', () => {
      cy.openDocPage()
      cy.uploadNewDocumentOnEmailPage()

    })
    it('Should open the Email page , compose the new email and send it', () => {
      cy.checkIfOnMailTab()
      cy.emailCompilation()
      cy.pressSendButton()

    })
    it('Should find new Letter in the Inbox tab and Open it', () => {
      cy.findTheLetterAndOpenIt()

    })
    it('Should Find received document and save it into the Document tab/list', () => {
      cy.findReceivedDocumentAndSaveItToFiles()

    })
    it('Should open Docuemtn list and clear it via drag n drop to trash', () => {
      cy.dragDocToTrash()

      cy.wait(5000)
  
      
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