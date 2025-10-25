import { describe, cy, it } from 'cypress';

describe('Test ingredient modal card', () => {
	const api_url = 'https://norma.education-services.ru/api/ingredients';
	const test_ingredient_id = 'test_ing_id_1';
	const test_header = 'Детали ингредиента';
	const test_modal_close_button = 'modal_close_button';
	const test_modal_overlay = 'modal_overlay';
	const test_ingredients_fextures = 'ingredients.json';

	it('open ingredient modal', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_ingredient_id}]`).click();
		cy.contains(test_header);
	});

	it('close ingredient modal by click on x', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_ingredient_id}]`).click();
		cy.get(`[data-testid=${test_modal_close_button}]`).click();
		cy.contains(test_header).should('not.exist');
	});

	it('close ingredient modal by click oon overlay', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_ingredient_id}]`).click();
		cy.get(`[data-testid=${test_modal_overlay}]`).click(0, 0);
		cy.contains(test_header).should('not.exist');
	});
});
