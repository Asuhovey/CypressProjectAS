import LohinPage from '../page-objects/LoginPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';
import MainPage from '../page-objects/MainPage';
import PageBody from '../page-objects/PageBody';


describe('Test Spec', () => {


  beforeEach(() => {

    cy.log("Start environment clearing")
    cy.clearEnvironment()

  })
  it('Should do things', () => {
    cy.fixture('fileAttachment').then(function (data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;
      cy.generateAttachment(this.data.filePath, this.data.attachmentName, this.data.attachmentExtension, this.data.attachmentText);
      const email = `a.suhovey@mailfence.com`
      const name = 'testtesttestset'

      cy.log('Step 1')
      LohinPage.login((Cypress.env('username')), (Cypress.env('password')))

      cy.log('Step 2')
      MainPage.clickOnDocTab()
      DocPage.openDocPage()

      cy.log('Step 3')
      cy.uploadNewDocumentOnDocumentPage(`${filePath}\\${attachmentName}.${attachmentExtension}`)

      cy.log('Step 4')
      cy.checkIfOnMailTab()
      EmailPage.clickOnNewEmailButton()
      EmailPage.emailCompilation(email, name)
      EmailPage.pressSendButton()

      cy.log('Step 5')
      EmailPage.findTheLetterAndOpenIt(name)
      EmailPage.findReceivedDocumentAndSaveItToFiles(`${attachmentName}.${attachmentExtension}`)

      cy.log('Step 6')
      MainPage.clickOnDocTab()
      cy.orDrop(DocPage.getUploadedDocFile(), DocPage.getTreeTrashArea())
      cy.reload().then(() => {
        cy.checkIfNeededFileDragged(DocPage.getUploadedDocFile())
      })
      cy.log('Test has been executed successfully!')
    })
  })
})