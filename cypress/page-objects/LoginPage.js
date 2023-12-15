class LohinPage {
    visit() {
        cy.visit('https://mailfence.com/'); // Перейти на главную страницу
    }

    openLogInForm() {
        return cy.get('#signin', { timeout: 10000 }).should('be.visible'); //Открыть поля для ввода логина и пароля
    }

    fillUsername(username) {
        cy.get('#UserID', { timeout: 10000 }).should('be.visible').type(username); // Ввод логина
    }

    fillPassword(password) {
        cy.get('#Password', { timeout: 10000 }).should('be.visible').type(password); // Ввод пароля
    }

    submitLogin() {
        cy.get('.btn').click().then(() => {
            cy.get('.icon24-Message', { timeout: 30000 }).should('be.visible')
        }); // Нажать кнопку "Войти"
    }

    login(username, password) {
        this.visit();
        this.openLogInForm().click();
        this.fillUsername(username);
        this.fillPassword(password);
        this.submitLogin();
    }
}

export default new LohinPage();