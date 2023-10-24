// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', () => {

//     // Используйте переменные окружения из файла .env
//     cy.get('#UserID').type(Cypress.env('username'));
//     cy.get('#Password').type(Cypress.env('password'));

//     cy.get('form').submit();
//   });
import ItemsInTheDocList from '../page-objects/ItemsInTheDocList';
import AllItemsInDocumentList from '../page-objects/AllItemsInDocumentList';
import ButtonsOfTheDocuments from '../page-objects/ButtonsOfTheDocuments';
import ButtonsOfTheInboxEmail from '../page-objects/ButtonsOfTheInboxEmail';
import LoginPage from '../page-objects/LoginPage';
import PageBody from '../page-objects/PageBody';

// Command#1 of identifing the fields and logining
  Cypress.Commands.add('login', () => {

    const loginPage=new LoginPage()
    loginPage.getLogInButton().click()
    cy.get('#UserID',{timeout:10000}).should('be.visible').type(Cypress.env('username'));
    cy.get('#Password',{timeout:10000}).should('be.visible').type(Cypress.env('password'));
    cy.get('.btn').click().then(()=>{
      cy.get('.icon24-Message', {timeout: 10000}).should('be.visible')
    })
  })

// Command#2 of checking if the test on the email tab (need to rework with some POMs and removing the WAITs)
  Cypress.Commands.add('checkIfOnMailTab', () => {

    const pageBody=new PageBody()
    cy.wait(5000)

    pageBody.getPageBody().then((body) => {
      const countOfElementsInBody = body.find('.listSubject').length;
      cy.wait(5000)
      if (countOfElementsInBody > 0) {
          cy.get('#mailNewBtn').click();
          cy.log('FOUND')}
       else {
        cy.get('.icon24-Message').click();
        cy.log('NOTFOUND')
      }
  });
})

// Command#3 Composint the email
Cypress.Commands.add('emailCompilation', () => {
  cy.get('.tbBtn.GCSDBRWBLDC.GCSDBRWBO.GCSDBRWBHV.mainTbBtn.GCSDBRWBGV',{ timeout: 5000 }).should('have.text','New').click()
  cy.get('#mailTo').type('a.suhovey@mailfence.com{enter}')
  cy.get('#mailSubject').type('testtesttestset')
  cy.get('a.GCSDBRWBJSB.GCSDBRWBKSB').first().click()
  cy.get('span.GCSDBRWBGR:contains("From document tool")').click()
  cy.get('.checkIcon').click()
  cy.get('.btn.GCSDBRWBO.defaultBtn').click()

})
// Command#4 Pressing 'Send' button for the composed email
Cypress.Commands.add('pressSendButton', () => {
  cy.get('#mailSend > .btnCtn',{timeout: 5000}).should('have.text','Send').should('be.visible').click()
})

// Command#5 Searching received email after timeout 
Cypress.Commands.add('findTheLetterAndOpenIt', () => {
  cy.wait(10000)
  cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="Refresh"]').should('be.visible').click()
  cy.get('.listSubject[title="testtesttestset"]').should('be.visible').click()
})

// Command#6 Find attached document and save it in the document tab
Cypress.Commands.add('findReceivedDocumentAndSaveItToFiles', () => {
  cy.get('.GCSDBRWBKRB.GCSDBRWBO[title="New Text Document.txt (1 KB)"]').rightclick()
  cy.get('span.GCSDBRWBGR:contains("Save in Documents")').click()
  cy.get('.treeItemLabel:contains(My documents)').should('be.visible').click()
  cy.wait(1000)
  cy.get('.btnCtn:contains(Save)').should('be.visible').click()

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

// Command#9 Upload document on the document page
Cypress.Commands.add("uploadNewDocumentOnEmailPage", (path, id) => {
  cy.fixture('fileAttachment.json').then((testData) => {
    const filePath = testData.filePath;
    const attachmentName = testData.attachmentName;
    const attachmentExtension = testData.attachmentExtension;
    const attachmentText = testData.attachmentText;

    const url = `https://mailfence.com/sw?type=gwtmail&state=71&v=2_5&oidMessage=${id}`;
    cy.readFile(`${filePath}/${attachmentName}.${attachmentExtension}`).then((fileContent) => {
      cy.request({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          file: {
            value: fileContent, // Используйте содержимое файла
            options: {
              filename: `${attachmentName}.${attachmentExtension}`,
              contentType: `application/${attachmentExtension}`,
            },
          },
          // Добавьте другие параметры запроса по необходимости
        },
      }).then((response) => {
        // Проверки на ответ
        expect(response.status).to.eq(200); // Проверьте статус HTTP-запроса
        // Добавьте другие проверки по необходимости
      })
    })
  })
})

// Command#10 Open document page
Cypress.Commands.add("openDocPage", () => {
  cy.get('.icon24-Documents.toolImg').click()
  cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout: 10000}).should('be.visible').click()
})

// Command#11 Upload document via UI and request on document page
Cypress.Commands.add("uploadNewDocumentOnDocumentPage", (path, url) => {
  url = `/sw?type=doc&state=26&gwt=1&oidDir=465459611`;
  cy.intercept(url).as(`uploadDocument`);
  cy.get("#new_doc input[type=file]", {timeout: 10000}).selectFile(path, { action: "select", force: true });
  cy.wait(`@uploadDocument`);

})

// Command#12 Clear all email in the email page for Inbox tab
Cypress.Commands.add("clearInboxEmails", () => {
  cy.get('.icon24-Message').click()
  cy.get('.treeItemLabel#treeInbox',{timeout:10000}).should('be.visible').click()
  cy.checkIfAnyExistElementsInEmail('.icon.icon-checkb')
})

// Command#13 Clear all files in the document page
Cypress.Commands.add("clearDocuments", () => {
  cy.get('.icon24-Documents.toolImg').click()
  cy.get('.GCSDBRWBDX.treeItemRoot.GCSDBRWBLX.nodeSel',{timeout:10000}).should('be.visible').click()
  cy.checkIfAnyExistElementsInDocuments()

})

// Command#14 Clear the environment from ALL email in the INBOX and from ALL files in the documents
Cypress.Commands.add("clearEnvironment", () => {
  cy.visit('https://mailfence.com/')
  cy.login()

  cy.clearInboxEmails()
  cy.clearDocuments()

  cy.logout()

})

// Command#14 Check if any mails are exist in the inbox tab for Email page
Cypress.Commands.add("checkIfAnyExistElementsInEmail", () => {
  cy.log("hyi")
  cy.get('.icon.icon-checkb', { timeout: 10000 }).should('be.visible').click();


  const buttons=new ButtonsOfTheInboxEmail()
    

    buttons.getButtons().then((buttones) => {
      const countOfElementsInButtons = buttones.find('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBFV.tbBtnDisabled[title="To Trash"]',{timeout:10000}).length;

      if (countOfElementsInButtons > 0) {
          cy.log('Email Inbox tab is empty')}
          else{
            cy.get('.GCSDBRWBO.tbBtn.afterSep.GCSDBRWBGV[title="To Trash"]').click()
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

// Command#16 Logout out from application 
Cypress.Commands.add("logout", () => {
  cy.get('.GCSDBRWBNE').click()
  cy.get('.GCSDBRWBPQ:contains("Log out")').click()

})