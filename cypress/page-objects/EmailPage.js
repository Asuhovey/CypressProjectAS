class EmailPage {

    getNewEmailButton() {
        cy.get('.tbBtn.GCSDBRWBLDC.GCSDBRWBO.GCSDBRWBHV.mainTbBtn.GCSDBRWBGV', { timeout: 5000 }).should('have.text', 'New')
    }

    clickOnNewEmailButton() {
        cy.get('.tbBtn.GCSDBRWBLDC.GCSDBRWBO.GCSDBRWBHV.mainTbBtn.GCSDBRWBGV', { timeout: 5000 }).should('have.text', 'New').click()
    }

    getToAddressTextField() {
        cy.get('#mailTo')
    }

    typeToAddressTextField(a) {
        cy.get('#mailTo').type(`${a}{enter}`)
    }

    clickToAddressTextField() {
        cy.get('#mailTo').click()
    }

    getSubjectTextField() {
        cy.get('#mailSubject')
    }

    typesubject(b) {
        cy.get('#mailSubject').type(b)
    }

    clickOnSubjectTextField() {
        cy.get('#mailSubject').click()
    }

    getAttachmentsButton() {
        cy.get('a.GCSDBRWBJSB.GCSDBRWBKSB')
    }

    clickOnAttachmentsButton() {
        cy.get('a.GCSDBRWBJSB.GCSDBRWBKSB').first().click()
    }

    getButtonFromDocTool() {
        cy.get('span.GCSDBRWBGR:contains("From document tool")')
    }

    clickOnButtonFromDocTool() {
        cy.get('span.GCSDBRWBGR:contains("From document tool")').click()
    }

    getDocCheckbox() {
        cy.get('.checkIcon', { timeout: 5000 })
    }

    clickOnDocCheckbox() {
        cy.get('.checkIcon', { timeout: 5000 }).click()
    }

    getSaveButton() {
        cy.get('.btn.GCSDBRWBO.defaultBtn')
    }

    clickOnSaveButton() {
        cy.get('.btn.GCSDBRWBO.defaultBtn').click()
    }

    getSendButton() {
        cy.get('#mailSend > .btnCtn', { timeout: 5000 }).should('have.text', 'Send').should('be.visible')
    }

    clickOnSendButton() {
        cy.get('#mailSend > .btnCtn', { timeout: 5000 }).should('have.text', 'Send').should('be.visible').click()
    }

    getRefreshButton() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="Refresh"]').should('be.visible')
    }

    clickOnRefreshButton() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="Refresh"]').should('be.visible').click()
    }

    getAnEmailByTitle(title) {
        cy.get(`.listSubject[title="${title}"]`).should('be.visible')
    }

    clickOnAnEmailByTitle(title) {
        cy.get(`.listSubject[title="${title}"]`).should('be.visible').click()
    }

    getAnAnyListSubjectFromInbox() {
        return '.listSubject'
    }

    clickOnAnAnyListSubjectFromInbox() {
        cy.get('.listSubject').click()
    }

    getAnInboxButtonInTheInbox() {
        cy.get('.treeItemLabel#treeInbox', { timeout: 10000 }).should('be.visible')
    }

    clickOnAnInboxButtonInTheInbox() {
        cy.get('.treeItemLabel#treeInbox', { timeout: 10000 }).should('be.visible').click()
    }

    getMainCheckboxAtInboxPage() {
        cy.get('.icon.icon-checkb')
    }

    clickOnMainCheckboxAtInboxPage() {
        cy.get('.icon.icon-checkb', { timeout: 10000 }).should('be.visible').click();
    }

    getDisabledTrashCanIcon() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]', { timeout: 10000 })
    }

    getDisabledTrashCanIconElement() {
        return '.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]'
    }

    clickOnDisabledTrashCanIon() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]').click()
    }

    getEnabledTrashCanicon() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]')
    }

    clickOnEnabledTrashCanicon() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]').click()
    }

    rightClickOnAttachedFile(titleOfAttachment) {
        cy.get('.GCSDBRWBKRB.GCSDBRWBO[title*="' + titleOfAttachment + '"]').should('be.visible').rightclick()
    }

    clickOnSaveInDocs() {
        cy.get('span.GCSDBRWBGR:contains("Save in Documents")').click()
    }

    clickOnMydocsWHTD() {
        cy.get('.treeItemLabel:contains(My documents)').should('be.visible').click()
    }

    clickAndSaveAttachmentFromLetter() {
        cy.get('.btnCtn:contains(Save)').should('be.visible').click()
    }

    getButtons() {
        return cy.get('div.GCSDBRWBMQC')
    }

    emailCompilation(to, subject) {
        //this.clickOnNewEmailButton();
        this.typeToAddressTextField(to)
    
        this.typesubject(subject)
        this.clickOnAttachmentsButton()
        this.clickOnButtonFromDocTool()
        this.clickOnDocCheckbox()
        this.clickOnSaveButton()
    }

    pressSendButton() {
        this.clickOnSendButton()
    }

    findTheLetterAndOpenIt(title) {
        cy.wait(10000)
        this.clickOnRefreshButton()
        this.clickOnAnEmailByTitle(title)
    }

    findReceivedDocumentAndSaveItToFiles(titleOfAttachment) {
        this.rightClickOnAttachedFile(titleOfAttachment)
        this.clickOnSaveInDocs()
        this.clickOnMydocsWHTD()
        cy.wait(1000)
        this.clickAndSaveAttachmentFromLetter()
    }
}

export default new EmailPage();