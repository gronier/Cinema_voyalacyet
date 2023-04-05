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
  it('user test', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');

    const nom = 'test';
    const prenom = 'testo';
    const email = 'test@test.com';
    const password = 'qslfidjhqiusgduyqfd_shqdfyfdqiosbcfdlwxcgouf-57635763';

    cy.get("#name").type(nom);
    cy.get("#firstname").type(prenom);
    cy.get("#email").type(email);
    cy.get("#psw").type(password);

    cy.get("#ok").click()

    cy.contains('Sign In').click();
    cy.url().should('include', '/signin');


    cy.get("#email").type(email);
    cy.get("#psw").type(password);

    // cy.get("#ok").click()



  });

});