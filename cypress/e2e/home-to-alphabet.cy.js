describe('Home to Alphabet flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the home page with title', () => {
    cy.contains("Hello! Let's Learn English!").should('be.visible');
    cy.contains('Alphabet Adventure').should('be.visible');
  });

  it('navigates to alphabet grid when clicking alphabet card', () => {
    cy.contains('Alphabet Adventure').click();
    cy.url().should('include', '/alphabet');
    cy.contains('Alphabet Adventure').should('be.visible');
    cy.contains('Tap a letter to hear it and start learning!').should(
      'be.visible'
    );
  });

  it('navigates to bottom nav links', () => {
    cy.get('nav a[aria-label="Alphabet"]').click();
    cy.url().should('include', '/alphabet');
  });

  it('shows rewards counters on home page', () => {
    cy.contains('🪙').should('be.visible');
    cy.contains('⭐').should('be.visible');
    cy.contains('🔥').should('be.visible');
  });
});
