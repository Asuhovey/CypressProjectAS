class DocPage {

    getMyDocTreeitem() {
        cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible')
    }

    clickMyDocTreeitem() {
        cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible').click()
    }

    getListItems() {
        return cy.get('.GCSDBRWBBU')
      }
      getListItemElement() {
        return document.querySelector('.GCSDBRWBBU')
      }

      getList() {
        return cy.get('.GCSDBRWBPT.GCSDBRWBLCC.GCSDBRWBO')
      }

      getListOfDocElements() {
        return cy.get('.GCSDBRWBO.GCSDBRWBAEC')
      }

      getDocInpput() {
        return  cy.get("#new_doc input[type=file]", {timeout: 10000})
      }

      getDISABLEDTrashCanIconElement() {
        return '.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]'
    }

    clickEnabledTrashCanIconElement() {
        return cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]').click()
    }

    clickOnCheckboxInDocPage() {
        return cy.get('.icon.icon-checkb',{timeout:10000}).click()
    }

    getUploadedDocFile() {
      return 'div.GCSDBRWBAKB:contains("TestAttachment1.txt")'
    }

    getSavedDocFile() {
      return 'div.GCSDBRWBAKB:contains("TestAttachment1_1.txt")'
    }

    getTreeTrashArea() {
      return '#doc_tree_trash'
    }
    
    openDocPage()  {
        this.getMyDocTreeitem()
      }

      
}

export default new DocPage();