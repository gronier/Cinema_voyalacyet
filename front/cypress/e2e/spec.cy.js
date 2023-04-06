describe('My First Test',  ()  => {

  it('user test', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Inscription').click();
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

    cy.contains('Connexion').click();
    cy.url().should('include', '/signin');


    cy.get("#email").type(email);
    cy.get("#psw").type(password);

    // cy.get("#ok").click()



  });
  it('Displays', () => {
    cy.visit('http://localhost:3000/Salle');
    cy.contains('Gestion des salles');
  });
  it('Links', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Connexion').click();
    cy.url().should('include', '/signin');
    cy.contains('Inscription').click();
    cy.url().should('include', '/signup');

  });

});
