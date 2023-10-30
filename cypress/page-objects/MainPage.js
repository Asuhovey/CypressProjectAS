class MainPage {

    getEmailTab() {
        cy.get('.icon24-Message')
    }

    clickOnEmailTab() {
        cy.get('.icon24-Message').click()
    }

    getDocTab() {
        cy.get('.icon24-Documents.toolImg')
    }

    clickOnDocTab() {
        cy.get('.icon24-Documents.toolImg').click()
    }

    getProfileIcon() {
        cy.get('.GCSDBRWBNE')
    }

    clickOnProfileIcon() {
        cy.get('.GCSDBRWBNE').click()
    }

    getLogOutButton() {
        cy.get('.GCSDBRWBPQ:contains("Log out")')
    }

    clickOnLogOutButton() {
        cy.get('.GCSDBRWBPQ:contains("Log out")').click()
    }

    logout () {
        this.clickOnProfileIcon()
        this.clickOnLogOutButton()
    }
}

export default new MainPage();