/// <reference types="cypress" />

import { generateNewBand } from '../../../__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '../../../lib/features/reservations/utils';

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

it("Display 'Error: Band not found' when route to unknown band id", () => {
	cy.task('db:reset').visit('/bands/12345');
	cy.findByRole('heading', { name: /Error: band not found/i }).should('exist');
});

it('displays name of the band that was not present at build time', () => {
	const bandId = generateRandomId();
	const newBand = generateNewBand(bandId);

	cy.task('db:reset').task('addBand', newBand).visit(`/bands/${bandId}`);
	cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');
});
