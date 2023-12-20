import LoginPage from '../page-objects/LoginPage';
import DocPage from './DocPage';
import EmailPage from './EmailPage';


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

    clearEnvironment() {
        cy.visit('https://mailfence.com/')
        LoginPage.login((Cypress.env('username')), (Cypress.env('password')))

        EmailPage.clearInboxEmails()
        DocPage.clearDocuments()
        cy.log("Environment is cleared")
        this.logout()
    }
}

export default new MainPage();