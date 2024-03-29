import LoginPage from '../page-objects/LoginPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';
import MainPage from '../page-objects/MainPage';


describe('Test Spec', () => {


  beforeEach(() => {

    cy.log("Start environment clearing")
    MainPage.clearEnvironment()

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
      LoginPage.login((Cypress.env('username')), (Cypress.env('password')))

      cy.log('Step 2')
      MainPage.getDocTab().click()
      DocPage.openDocPage()

      cy.log('Step 3')
      DocPage.uploadNewDocumentOnDocumentPage(`${filePath}\\${attachmentName}.${attachmentExtension}`)

      cy.log('Step 4')
      EmailPage.checkIfOnMailTab()
      EmailPage.getNewEmailButton().click()
      EmailPage.emailCompilation(email, name)
      EmailPage.pressSendButton()

      cy.log('Step 5')
      EmailPage.findTheLetterAndOpenIt(name)
      EmailPage.findReceivedDocumentAndSaveItToFiles(`${attachmentName}.${attachmentExtension}`)

      cy.log('Step 6')
      MainPage.getDocTab().click()
      
      DocPage.getUploadedDocFileNamepls().dragAndDrop("#doc_tree_trash")
      //cy.orDrop(DocPage.getUploadedDocFileNamepls(), 1, DocPage.getTreeTrashArea())
      cy.reload().then(() => {
        DocPage.checkIfNeededFileDragged(DocPage.getUploadedDocFileNameplsss())
      })
      cy.log('Test has been executed successfully!')
    })
  })
})