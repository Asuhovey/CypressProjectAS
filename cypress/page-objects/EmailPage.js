import MainPage from '../page-objects/MainPage';
import PageBody from '../page-objects/PageBody';

class EmailPage {

    getNewEmailButton() {
        return cy.get('.tbBtn.GCSDBRWBLDC.GCSDBRWBO.GCSDBRWBHV.mainTbBtn.GCSDBRWBGV', { timeout: 5000 }).should('have.text', 'New')
    }

    getToAddressTextField() {
        return cy.get('#mailTo')
    }

    getSubjectTextField() {
        cy.get('#mailSubject')
    }

    typesubject(b) {
        cy.get('#mailSubject').type(b)
    }

    getAttachmentsButton() {
        cy.get('a.GCSDBRWBJSB.GCSDBRWBKSB')
    }

    getOnAttachmentsButton() {
        return cy.get('a.GCSDBRWBJSB.GCSDBRWBKSB').first()
    }

    getButtonFromDocTool() {
        cy.get('span.GCSDBRWBGR:contains("From document tool")')
    }

    getOnButtonFromDocTool() {
        return cy.get('span.GCSDBRWBGR:contains("From document tool")')
    }

    getDocCheckbox() {
        cy.get('.checkIcon', { timeout: 5000 })
    }

    getOnDocCheckbox() {
        return cy.get('.checkIcon', { timeout: 5000 })
    }

    getSaveButton() {
        cy.get('.btn.GCSDBRWBO.defaultBtn')
    }

    getOnSaveButton() {
        return cy.get('.btn.GCSDBRWBO.defaultBtn')
    }

    getSendButton() {
        cy.get('#mailSend > .btnCtn', { timeout: 5000 }).should('have.text', 'Send').should('be.visible')
    }

    getOnSendButton() {
        return cy.get('#mailSend > .btnCtn', { timeout: 5000 }).should('have.text', 'Send').should('be.visible')
    }

    getRefreshButton() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="Refresh"]').should('be.visible')
    }

    getOnRefreshButton() {
        return cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="Refresh"]').should('be.visible')
    }

    getAnEmailByTitle(title) {
        cy.get(`.listSubject[title="${title}"]`).should('be.visible')
    }

    getOnAnEmailByTitle(title) {
        return cy.get(`.listSubject[title="${title}"]`).should('be.visible')
    }

    getAnAnyListSubjectFromInbox() {
        return '.listSubject'
    }

    getAnInboxButtonInTheInbox() {
        return cy.get('.treeItemLabel#treeInbox', { timeout: 10000 }).should('be.visible')
    }

    getMainCheckboxAtInboxPage() {
        return cy.get('.icon.icon-checkb', { timeout: 10000 }).should('be.visible')
    }

    getDisabledTrashCanIcon() {
        cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]', { timeout: 10000 })
    }

    getDisabledTrashCanIconElement() {
        return '.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]'
    }

    getEnabledTrashCanicon() {
        return cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]')
    }

    getClickOnAttachedFile(titleOfAttachment) {
        return cy.get('.GCSDBRWBKRB.GCSDBRWBO[title*="' + titleOfAttachment + '"]').should('be.visible')
    }

    getOnSaveInDocs() {
        return cy.get('span.GCSDBRWBGR:contains("Save in Documents")')
    }

    getOnMydocsWHTD() {
        return cy.get('.treeItemLabel:contains(My documents)').should('be.visible')
    }

    getAndSaveAttachmentFromLetter() {
        return cy.get('.btnCtn:contains(Save)').should('be.visible')
    }

    getButtons() {
        return cy.get('div.GCSDBRWBMQC')
    }

    typeToAddressTextField(a) {
        this.getToAddressTextField().type(`${a}{enter}`)
    }


    emailCompilation(to, subject) {
        this.typeToAddressTextField(to)

        this.typesubject(subject)
        this.getOnAttachmentsButton().click()
        this.getOnButtonFromDocTool().click()
        this.getOnDocCheckbox().click()
        this.getOnSaveButton().click()
    }

    pressSendButton() {
        this.getOnSendButton().click()
    }

    findTheLetterAndOpenIt(title) {
        cy.wait(10000)
        this.getOnRefreshButton().click()
        this.getOnAnEmailByTitle(title).click()
    }

    findReceivedDocumentAndSaveItToFiles(titleOfAttachment) {
        this.getClickOnAttachedFile(titleOfAttachment).rightclick()
        this.getOnSaveInDocs().click()
        this.getOnMydocsWHTD().click()
        cy.wait(1000)
        this.getAndSaveAttachmentFromLetter().click()
    }


    removeAllInboxEmails() {
        cy.log("Clearing the Email tab")
        this.getMainCheckboxAtInboxPage().click()



        this.getButtons().then((buttones) => {
            const elementVal = this.getDisabledTrashCanIconElement()
            const countOfElementsInButtons = buttones.find(elementVal, { timeout: 10000 }).length;

            if (countOfElementsInButtons > 0) {
                cy.log('Email Inbox tab is empty')
            }
            else {
                this.getEnabledTrashCanicon().click()
            }
        })

    }


    clearInboxEmails() {
        MainPage.getEmailTab().click()
        this.getAnInboxButtonInTheInbox().click()
        this.removeAllInboxEmails()
    }

    checkIfOnMailTab() {

        const pageBody = new PageBody()


        pageBody.getPageBody().then((body) => {
            const countOfElementsInBody = body.find(this.getAnAnyListSubjectFromInbox(), { timeout: 10000 }).length;
            if (countOfElementsInBody > 0) {
                this.getNewEmailButton()
                cy.log('FOUND')
            }
            else {
                MainPage.getEmailTab().click()
                cy.log('NOTFOUND')
            }
        })
    }
}

export default new EmailPage();