import PageBody from '../page-objects/PageBody';
import MainPage from '../page-objects/MainPage';


class DocPage {

  getMyDocTreeitem() {
    return cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel', { timeout: 10000 }).should('be.visible')
  }

  getListItems() {
    return cy.get('.GCSDBRWBKCC')
  }

  getListItemElement() {
    return document.querySelector('.GCSDBRWBKCC')
  }

  getList() {
    return cy.get('.GCSDBRWBPT.GCSDBRWBLCC.GCSDBRWBO')
  }

  getListOfDocElements() {
    return cy.get('.GCSDBRWBO.GCSDBRWBAEC')
  }

  getDocInpput() {
    return cy.get("#new_doc input[type=file]", { timeout: 10000 })
  }

  getDisabledTrashCanIconElement() {
    return '.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]'
  }

  getEnabledTrashCanIconElement() {
    return cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]', { timeout: 10000 })
  }

  getOnCheckboxInDocPage() {
    return cy.get('.icon.icon-checkb', { timeout: 10000 })
  }

  getUploadedDocFileNamepls() {
    return `div.GCSDBRWBAKB:contains(TestAttachment1.txt)`;
  }



  getUploadedDocFileeee() {
    cy.fixture('fileAttachment').then(function (data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;

      // Возвращаем селектор с именем файла
      return `div.GCSDBRWBAKB:contains("${attachmentName}.${attachmentExtension}")`;
    })
  }

  getUploadedDocFile(attachmentName, attachmentExtension) {
    cy.fixture('fileAttachment').then(function (data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;
      return `div.GCSDBRWBAKB:contains(${attachmentName}.${attachmentExtension})`;
    })
  }

  getSavedDocFile(attachmentName, attachmentExtension) {
    cy.fixture('fileAttachment').then(function (data) {
      this.data = data;
      const filePath = this.data.filePath;
      const attachmentName = this.data.attachmentName;
      const attachmentExtension = this.data.attachmentExtension;
      return `div.GCSDBRWBAKB:contains(${attachmentName}_1.${attachmentExtension})`;
    })
  }

  getTreeTrashArea() {
    return cy.get('#doc_tree_trash', { timeout: 10000 }).should('be.visible')
  }

  openDocPage() {
    this.getMyDocTreeitem()
  }
  checkIfNeededFileDragged() {
    const pageBody = new PageBody()
    const uploadedFile = file
    pageBody.getPageBody().then((body) => {
      const countOfElementsInBody = body.find(uploadedFile).length;

      if (countOfElementsInBody.length > 0) {
        cy.log('File was not moved to "trash" folder, Test is FAILED')
      } else {
        cy.log('File was moved to "trash" folder, Test is PASSED')
      }
    })

  }

  checkIfAnyExistElementsInDocuments() {
    this.getOnCheckboxInDocPage().click()
    this.getEnabledTrashCanIconElement().click()



    this.getListOfDocElements().then(($frt) => {
      const elementDocV = this.getDisabledTrashCanIconElement()
      const countOfElementsInButtons = $frt.find(elementDocV, { timeout: 10000 }).length;

      if (countOfElementsInButtons > 0) {
        cy.log('Attachments are not occured')
      }
      else {
        this.getEnabledTrashCanIconElement().then(() => {
          const pageBody = new PageBody()
          const listItemElement = this.getListItems()
          pageBody.getPageBody().then((body) => {
            const countOfElementsInBody = body.find(listItemElement).length;

            if (countOfElementsInBody > 0) {
              cy.log("Attachments are not deleted!")
            } else {
              cy.log("Attachments are deleted successfully Or Not detected")
            }
          })
        })
      }
    })
  }
  clearDocuments() {
    MainPage.getDocTab().click()
    this.getMyDocTreeitem().click()
    this.checkIfAnyExistElementsInDocuments()

  }

  uploadNewDocumentOnDocumentPage(path, url) {
    url = `/sw?type=doc&state=26&gwt=1&oidDir=465459611`;
    cy.intercept(url).as(`uploadDocument`);
    cy.log("File is attached on the Document page" + "     " + path)
    this.getDocInpput().selectFile(path, { action: "select", force: true });
    cy.wait(`@uploadDocument`);

  }
}



export default new DocPage();