/// <reference types="cypress" />

it('shows the correct heading when navigating to shows page', () => {
	cy.visit('/');
	cy.findByRole('button', { name: /shows/i }).click();
	cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
});

it('shows the correct heading when navigating to bands page', () => {
	cy.visit('/');
	cy.findByRole('button', { name: /bands/i }).click();
	cy.findByRole('heading', { name: /Our Illustrious Performers/i }).should('exist');
});

it('displays correct band name for the band route that existed at build time', () => {
	cy.task('db:reset').visit('/bands/1');
	cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
});

it.only("Display 'Error: Band not found' when route to unknown band id", () => {
	cy.task('db:reset').visit('/bands/12345');
	cy.findByRole('heading', { name: /Error: band not found/i }).should('exist');
});
