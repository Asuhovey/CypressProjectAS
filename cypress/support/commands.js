import ItemsInTheDocList from '../page-objects/ItemsInTheDocList';
import AllItemsInDocumentList from '../page-objects/AllItemsInDocumentList';
import ButtonsOfTheDocuments from '../page-objects/ButtonsOfTheDocuments';
import ButtonsOfTheInboxEmail from '../page-objects/ButtonsOfTheInboxEmail';
import LohinPage from '../page-objects/LohinPage';
import PageBody from '../page-objects/PageBody';
import MainPage from '../page-objects/MainPage';
import EmailPage from '../page-objects/EmailPage';
import DocPage from '../page-objects/DocPage';

// Command#2 of checking if the test on the email tab (need to rework with some POMs and removing the WAITs)
  Cypress.Commands.add('checkIfOnMailTab', () => {

    const pageBody=new PageBody()
    cy.wait(5000)

    pageBody.getPageBody().then((body) => {
      const countOfElementsInBody = body.find('.listSubject').length;
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

// Command#7 Drag&Drop command
Cypress.Commands.add('dragDocToTrash', () => {
  // Переменные для элемента, который будет перетаскиваться
  let startX, startY;
  // Переменные для дестенейшена
  let dropX, dropY;

  // Получаем начальные координаты элемента, который будет перетаскиваться
  cy.get('.GCSDBRWBDKB > .GCSDBRWBGT').invoke('offset').then((offset) => {
    startX = offset.left;
    startY = offset.top;
    cy.log(`Позиция старта элемента x: ${startX}, Позиция старта элемента y: ${startY}`);

    // Получаем координаты дестенейшена
    cy.get('#doc_tree_trash').invoke('offset').then((offset) => {
      dropX = offset.left;
      dropY = offset.top;
      cy.log(`Позиция дестенейшен x: ${dropX}, Позиция дестенейшен y: ${dropY}`);
    }).then(() => {
      // Используем начальные и дестенейшен координаты в операции "drag and drop"
      cy.wait(2000)
      cy.get('.GCSDBRWBDKB > .GCSDBRWBGT').then((subject)=>{
        cy.wrap(subject).trigger('mousedown', { which: 1, pageX: 222, pageY: 92,force: true })
        .trigger('mousemove', { which: 1, pageX: 27, pageY: 86,force: true })
        

      cy.get('#doc_tree_trash').trigger('mouseup')
    })
      
    })
  })
})
 
// Command#8 Generate attachment and create it in the directory
Cypress.Commands.add('generateAttachment', (filePath, attachmentName, attachmentExtension, attachmentText)=> {
  cy.writeFile(`${filePath}\\${attachmentName}.${attachmentExtension}`, `${attachmentText}`);
  cy.readFile(`${filePath}\\${attachmentName}.${attachmentExtension}`).should("not.be.null");
})

// Command#11 Upload document via UI and request on document page
Cypress.Commands.add("uploadNewDocumentOnDocumentPage", (path, url) => {
  url = `/sw?type=doc&state=26&gwt=1&oidDir=465459611`;
  cy.intercept(url).as(`uploadDocument`);
  cy.log("YEAHBOOOOODY"+"     "+path)
  cy.get("#new_doc input[type=file]", {timeout: 10000}).selectFile(path, { action: "select", force: true });
  cy.wait(`@uploadDocument`);

})

// Command#12 Clear all email in the email page for Inbox tab
Cypress.Commands.add("clearInboxEmails", () => {
  MainPage.clickOnEmailTab()
  EmailPage.clickOnAnInboxButtonInTheInbox()
  cy.checkIfAnyExistElementsInEmail('.icon.icon-checkb')
})

// Command#13 Clear all files in the document page
Cypress.Commands.add("clearDocuments", () => {
  MainPage.clickOnDocTab()
  cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout:10000}).should('be.visible').click()
  cy.checkIfAnyExistElementsInDocuments()

})

// Command#14 Clear the environment from ALL email in the INBOX and from ALL files in the documents
Cypress.Commands.add("clearEnvironment", () => {
  cy.visit('https://mailfence.com/')
  LohinPage.login((Cypress.env('username')), (Cypress.env('password')))

  cy.clearInboxEmails()
  cy.clearDocuments()

  MainPage.logout()

})

// Command#14 Check if any mails are exist in the inbox tab for Email page
Cypress.Commands.add("checkIfAnyExistElementsInEmail", () => {
  cy.log("Clearing the Email tab")
  EmailPage.clickOnMainCheckboxAtInboxPage()


  const buttons=new ButtonsOfTheInboxEmail()
    

    buttons.getButtons().then((buttones) => {
      const countOfElementsInButtons = buttones.find(('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]',{timeout:10000})).length;

      if (countOfElementsInButtons > 0) {
          cy.log('Email Inbox tab is empty')}
          else{
            EmailPage.clickOnENABLEDTrashCanicon()
          }
})
})

// Command#15 Check if any files are uploaded in documents tab
Cypress.Commands.add("checkIfAnyExistElementsInDocuments", () => {
   cy.get('.icon.icon-checkb',{timeout:10000}).click()

  const buttons = new ButtonsOfTheDocuments()

    

    buttons.getListOfDocElements().then(($frt) => {
      const countOfElementsInButtons = $frt.find('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]',{timeout:10000}).length;

      if (countOfElementsInButtons > 0) {
        cy.log('Attachments are not occured')}
        else{
          //const name = cy.get('.GCSDBRWBBU.GCSDBRWBDU.trow').should('have.text',"")
          cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]').click().then(() => {
            const list = new AllItemsInDocumentList()
            const listItemm = new ItemsInTheDocList()
            const pageBody=new PageBody()
            const listItemElement = listItemm.getListItemElement()
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
