describe('ingredient dragging is working', function() {
  Cypress.config().baseUrl

  beforeEach(function() {
    cy.visit('');
    cy.get('[data-cy="ingredient"]').first().as('ingredient');
  });

  it('Should open and close ingredient description modal', function() {

    cy.get('@ingredient').click();
    cy.get('[data-cy="itemDescription"]').should('be.visible');
    cy.get('[data-cy="itemProperty"]').first().should('not.be.empty');
    cy.get('[data-cy="closeModalIcon"]').first().click({force: true});
    cy.get('[data-cy="itemDescription"]').should('not.exist');
  });

  it('Should make an order', function() {
    cy.get('[data-cy="ingredientsDropArea"]').first().as('dropArea')
    cy.get('[data-cy="constructorItem"]').should('not.exist');

    cy.get('@ingredient').trigger('dragstart');
    cy.get('@dropArea').trigger('dragover');

    cy.get('@dropArea').trigger('drop');
    cy.get('[data-cy="constructorItem"]').should('be.visible');

    cy.visit('#/login');
    cy.get('[data-cy="emailInput"').first().type('serensha@mail.ru');
    cy.get('[data-cy="passwordInput"').first().type('1');
    cy.get('[data-cy="enterButton"').first().click();

    cy.get('[data-cy="orderButton"]').click();

    cy.get('[data-cy="orderId"]').should('be.visible');
    cy.get('[data-cy="orderId"]').should('be.not.empty');
    console.log("finished");
  });

}); 