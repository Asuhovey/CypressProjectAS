import LohinPage from '../page-objects/LoginPage';
import PageBody from '../page-objects/PageBody';
import MainPage from '../page-objects/MainPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';

Cypress.Commands.add('checkIfOnMailTab', () => {

  const pageBody = new PageBody()


  pageBody.getPageBody().then((body) => {
    const countOfElementsInBody = body.find(EmailPage.getAnAnyListSubjectFromInbox(), { timeout: 10000 }).length;
    if (countOfElementsInBody > 0) {
      EmailPage.getNewEmailButton()
      cy.log('FOUND')
    }
    else {
      MainPage.getEmailTab().click()
      cy.log('NOTFOUND')
    }
  });
})

Cypress.Commands.add('orDrop', (subject, targetbob) => {
  cy.get(subject).should('be.visible', { timeout: 30000 });
  Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${targetbob}`,
    consoleProps: () => {
      return {
        subject: subject,
        targetbob: targetbob
      };
    }
  });
  const BUTTON_INDEX = 0;
  cy.get(targetbob).then($targetbob => {
    let coordsDrop = $targetbob[0].getBoundingClientRect();
    cy.get(subject)
      .then(subject => {
        const coordsDrag = subject[0].getBoundingClientRect();
        cy.wrap(subject)
          .trigger('mousedown', {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x,
            clientY: coordsDrag.y,
            force: true
          })
          .trigger('mousemove', {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x - 5,
            clientY: coordsDrag.y - 5,
            force: true
          }).wait(1000);
        cy.get(targetbob)
          .trigger('mousemove', {
            button: BUTTON_INDEX,
            clientX: coordsDrop.x,
            clientY: coordsDrop.y,
            force: true
          })
          .trigger('mouseup', { force: true });
      });
  });
});

Cypress.Commands.add('generateAttachment', (filePath, attachmentName, attachmentExtension, attachmentText) => {
  cy.writeFile(`${filePath}\\${attachmentName}.${attachmentExtension}`, `${attachmentText}`);
  cy.readFile(`${filePath}\\${attachmentName}.${attachmentExtension}`).should("not.be.null");
})

Cypress.Commands.add("uploadNewDocumentOnDocumentPage", (path, url) => {
  url = `/sw?type=doc&state=26&gwt=1&oidDir=465459611`;
  cy.intercept(url).as(`uploadDocument`);
  cy.log("File is attached on the Document page" + "     " + path)
  DocPage.getDocInpput().selectFile(path, { action: "select", force: true });
  cy.wait(`@uploadDocument`);

})

Cypress.Commands.add("clearInboxEmails", () => {
  MainPage.getEmailTab().click()
  EmailPage.getAnInboxButtonInTheInbox().click()
  cy.RemoveAllInboxEmails()
})

Cypress.Commands.add("clearDocuments", () => {
  MainPage.getDocTab().click()
  DocPage.getMyDocTreeitem().click()
  cy.checkIfAnyExistElementsInDocuments()

})

Cypress.Commands.add("clearEnvironment", () => {
  cy.visit('https://mailfence.com/')
  LohinPage.login((Cypress.env('username')), (Cypress.env('password')))

  cy.clearInboxEmails()
  cy.clearDocuments()
  cy.log("Environment is cleared")
  MainPage.logout()

})

Cypress.Commands.add("RemoveAllInboxEmails", () => {
  cy.log("Clearing the Email tab")
  EmailPage.getMainCheckboxAtInboxPage().click()



  EmailPage.getButtons().then((buttones) => {
    const elementVal = EmailPage.getDisabledTrashCanIconElement()
    const countOfElementsInButtons = buttones.find(elementVal, { timeout: 10000 }).length;

    if (countOfElementsInButtons > 0) {
      cy.log('Email Inbox tab is empty')
    }
    else {
      EmailPage.getEnabledTrashCanicon().click()
    }
  })
})

Cypress.Commands.add("checkIfAnyExistElementsInDocuments", () => {
  DocPage.getOnCheckboxInDocPage().click()
  DocPage.getEnabledTrashCanIconElement().click()



  DocPage.getListOfDocElements().then(($frt) => {
    const elementDocV = DocPage.getDisabledTrashCanIconElement()
    const countOfElementsInButtons = $frt.find(elementDocV, { timeout: 10000 }).length;

    if (countOfElementsInButtons > 0) {
      cy.log('Attachments are not occured')
    }
    else {
      DocPage.getEnabledTrashCanIconElement().then(() => {
        const pageBody = new PageBody()
        const listItemElement = DocPage.getListItems()
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
})

Cypress.Commands.add("checkIfNeededFileDragged", (file) => {
  const pageBody = new PageBody()
  const uploadedFile = file
  pageBody.getPageBody().then((body) => {
    const countOfElementsInBody = body.find(uploadedFile).length;

    if (countOfElementsInBody.length > 0) {
      cy.log('File was not moved to "trash" folder, Test is FAILED')
    } else {
      cy.log('File was moved to "trash" folder, Test is PASSED')
    }
  });
})