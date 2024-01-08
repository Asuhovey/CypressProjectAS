import LoginPage from '../page-objects/LoginPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';
import MainPage from '../page-objects/MainPage';


describe('Test Spec', () => {

    it('Should do things', () => {
    cy.log('Step 1')
      LoginPage.login((Cypress.env('username')), (Cypress.env('password')))

      cy.log('Step 2')
      MainPage.getDocTab().click()
      DocPage.openDocPage()
    cy.orDrop(DocPage.getUploadedDocFileNamepls(), 1, '#doc_tree_trash')
    cy.reload().then(() => {
    DocPage.checkIfNeededFileDragged(DocPage.getUploadedDocFileNamepls())
   })
    cy.log('Test has been executed successfully!')
  })
})