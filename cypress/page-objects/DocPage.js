class DocPage {

    getMyDocTreeitem() {
        return cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible')
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
      return  cy.get("#new_doc input[type=file]", {timeout: 10000})
    }
    
    getDisabledTrashCanIconElement() {
      return '.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]'
    }
    
    getEnabledTrashCanIconElement() {
      return cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]', {timeout: 10000})
    }
    
    getOnCheckboxInDocPage() {
      return cy.get('.icon.icon-checkb',{timeout:10000})
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
      return '#doc_tree_trash'
    }
    
    openDocPage()  {
      this.getMyDocTreeitem()
    }     
}




export default new DocPage();