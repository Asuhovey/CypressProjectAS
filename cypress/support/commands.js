import LohinPage from '../page-objects/LohinPage';
import PageBody from '../page-objects/PageBody';
import MainPage from '../page-objects/MainPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';

// Command#1 of checking if the test on the email tab (need to rework with some POMs and removing the WAITs)
  Cypress.Commands.add('checkIfOnMailTab', () => {

    const pageBody=new PageBody()
    
    cy.wait(5000)

    pageBody.getPageBody().then((body) => {
    const countOfElementsInBody = body.find(EmailPage.getAnAnyListSubjectFromInbox()).length;
    cy.wait(5000)
    if (countOfElementsInBody > 0) {
      EmailPage.getNewEmailButton()
      cy.log('FOUND')}
      else {
        MainPage.clickOnEmailTab()
        cy.log('NOTFOUND')
      }
  });
})

// Command#2 Drag&Drop command
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
                      .trigger('mouseup', {force: true});
              });
      });
});

// Command#3 Generate attachment and create it in the directory
Cypress.Commands.add('generateAttachment', (filePath, attachmentName, attachmentExtension, attachmentText)=> {
  cy.writeFile(`${filePath}\\${attachmentName}.${attachmentExtension}`, `${attachmentText}`);
  cy.readFile(`${filePath}\\${attachmentName}.${attachmentExtension}`).should("not.be.null");
})

// Command#4 Upload document via UI and request on document page
Cypress.Commands.add("uploadNewDocumentOnDocumentPage", (path, url) => {
  url = `/sw?type=doc&state=26&gwt=1&oidDir=465459611`;
  cy.intercept(url).as(`uploadDocument`);
  cy.log("File is attached on the Document page"+"     "+path)
  DocPage.getDocInpput().selectFile(path, { action: "select", force: true });
  cy.wait(`@uploadDocument`);

})

// Command#5 Clear all email in the email page for Inbox tab
Cypress.Commands.add("clearInboxEmails", () => {
  MainPage.clickOnEmailTab()
  EmailPage.clickOnAnInboxButtonInTheInbox()
  cy.checkIfAnyExistElementsInEmail()
})

// Command#6 Clear all files in the document page
Cypress.Commands.add("clearDocuments", () => {
  MainPage.clickOnDocTab()
  DocPage.clickMyDocTreeitem()
  cy.checkIfAnyExistElementsInDocuments()

})

// Command#7 Clear the environment from ALL email in the INBOX and from ALL files in the documents
Cypress.Commands.add("clearEnvironment", () => {
  cy.visit('https://mailfence.com/')
  LohinPage.login((Cypress.env('username')), (Cypress.env('password')))

  cy.clearInboxEmails()
  cy.clearDocuments()
  cy.log("Environment is cleared")
  MainPage.logout()

})

// Command#8 Check if any mails are exist in the inbox tab for Email page
Cypress.Commands.add("checkIfAnyExistElementsInEmail", () => {
  cy.log("Clearing the Email tab")
  EmailPage.clickOnMainCheckboxAtInboxPage()

    

    EmailPage.getButtons().then((buttones) => {
      const elementVal = EmailPage.getDISABLEDTrashCanIconElement()
      const countOfElementsInButtons = buttones.find(elementVal,{timeout:10000}).length;

      if (countOfElementsInButtons > 0) {
          cy.log('Email Inbox tab is empty')}
          else{
            EmailPage.clickOnENABLEDTrashCanicon()
          }
})
})

// Command#9 Check if any files are uploaded in documents tab
Cypress.Commands.add("checkIfAnyExistElementsInDocuments", () => {
   DocPage.clickOnCheckboxInDocPage()

    

  DocPage.getListOfDocElements().then(($frt) => {
    const elementDocV = DocPage.getDISABLEDTrashCanIconElement()
      const countOfElementsInButtons = $frt.find(elementDocV,{timeout:10000}).length;

      if (countOfElementsInButtons > 0) {
        cy.log('Attachments are not occured')}
        else{
            DocPage.clickEnabledTrashCanIconElement().then(() => {
            const pageBody=new PageBody()
            const listItemElement = DocPage.getListItemElement()
            pageBody.getPageBody().then((body) => {
            const countOfElementsInBody = body.find(listItemElement).length;

              if (countOfElementsInBody > 0){
                cy.log("Attachments are not deleted!")
              } else {
                cy.log("Attachments are deleted successfully Or Not detected")
              }
            })
          })
}
})
})

//Command#10 Check if needed attahment was dragged to trash can
Cypress.Commands.add("checkIfNeededFileDragged", (file) => {
  const pageBody=new PageBody()
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