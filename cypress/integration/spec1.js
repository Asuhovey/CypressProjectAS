describe('Test Spec', () => {

  
beforeEach(() => {
    cy.clearEnvironment()
    
    

    cy.log("ENDNEDNEDNDENEDNDENDENDENDENDENDEDEN")

    
    })
    it('Should do things', () => {
      cy.fixture('fileAttachment').then(function(data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;
      cy.generateAttachment(this.data.filePath, this.data.attachmentName, this.data.attachmentExtension, this.data.attachmentText);
      
      cy.visit('https://mailfence.com/')
      
      cy.login()

      
    
    
      cy.openDocPage()
      cy.uploadNewDocumentOnDocumentPage(`${filePath}\\${attachmentName}.${attachmentExtension}`)

    
    
      cy.checkIfOnMailTab()
      cy.emailCompilation()
      cy.pressSendButton()

    
    
      cy.findTheLetterAndOpenIt()

    
    
      cy.findReceivedDocumentAndSaveItToFiles(`${attachmentName}.${attachmentExtension}`)

    
    
      cy.dragDocToTrash()
      cy.wait(5000)
    
  })
})
})