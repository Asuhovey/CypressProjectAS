import LohinPage from '../page-objects/LohinPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';
import MainPage from '../page-objects/MainPage';

describe('Test Spec', () => {

  
beforeEach(() => {
    cy.clearEnvironment()
    
    

    cy.log("Environment is cleared")

    
    })
    it('Should do things', () => {
      cy.fixture('fileAttachment').then(function(data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;
      cy.generateAttachment(this.data.filePath, this.data.attachmentName, this.data.attachmentExtension, this.data.attachmentText);
      
      cy.visit('https://mailfence.com/')
      
      LohinPage.login((Cypress.env('username')), (Cypress.env('password')))

      
    
  
      MainPage.clickOnDocTab()
      DocPage.openDocPage()
      cy.uploadNewDocumentOnDocumentPage(`${filePath}\\${attachmentName}.${attachmentExtension}`)

    
    
      cy.checkIfOnMailTab()
        const a = 'a.suhovey@mailfence.com{enter}'
        const b = 'testtesttestset'
        EmailPage.clickOnNewEmailButton()
        EmailPage.emailCompilation(a , b) 
          
        EmailPage.pressSendButton()

    
    
      EmailPage.findTheLetterAndOpenIt(b)

    
    
      EmailPage.findReceivedDocumentAndSaveItToFiles(`${attachmentName}.${attachmentExtension}`)

    
    
      cy.dragDocToTrash()
      cy.wait(5000)
    
  })
})
})