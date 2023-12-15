class MainPage {

    getEmailTab() {
        return cy.get('.icon24-Message')
    }

    getDocTab() {
        return cy.get('.icon24-Documents.toolImg', { timeout: 10000 }).should('be.visible')
    }

    getProfileIcon() {
        return cy.get('.GCSDBRWBNE')
    }

    getLogOutButton() {
        return cy.get('.GCSDBRWBPQ:contains("Log out")')
    }

    logout() {
        this.getProfileIcon().click()
        this.getLogOutButton().click()
    }
}

export default new MainPage();