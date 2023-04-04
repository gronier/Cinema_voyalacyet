describe('My First Test',  ()  => {
  it('Displays', () => {
    cy.visit('http://localhost:3000/Salle');
    cy.contains('Gestion des salles');
  });
  it('Links', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Reservation').click();
    cy.url().should('include', '/reservation');
    cy.contains('Seance').click();
    cy.url().should('include', '/seance');
    cy.contains('Salle').click();
    cy.url().should('include', '/Salle');

  });

});