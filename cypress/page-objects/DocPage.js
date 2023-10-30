class DocPage {

    getMyDocTreeitem() {
        cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible')
    }

    clickMyDocTreeitem() {
        cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible').click()
    }



    openDocPage()  {
        this.getMyDocTreeitem()
      }

      
}

export default new DocPage();