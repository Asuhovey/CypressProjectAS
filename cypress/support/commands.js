Cypress.Commands.add('orDrop', (subject, subjectIndex, target) => {
  cy.get(subject).should('be.visible', { timeout: 30000 });
  cy.get(target).should('be.visible', { timeout: 30000 });

  Cypress.log({
    name: 'DRAGNDROP',
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target
      };
    }
  });


  const BUTTON_INDEX = 0;

  cy.get(target).then($trg => {
    let coordsDrop = $trg[0].getBoundingClientRect().top;

    cy.get(subject).eq(subjectIndex).then(subject => {
      const coordsDrag = subject[0].getBoundingClientRect().top;

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
        })
        .wait(1000);

      cy.get(target)
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