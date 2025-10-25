import { describe, cy, it } from 'cypress';

describe('Test ingredient drag-n-drop', () => {
	const api_url = 'https://norma.education-services.ru/api/ingredients';
	const test_bun_id = 'test_bun_id_1';
	const test_ingredient_1_id = 'test_ing_id_1';
	const test_ingredient_2_id = 'test_ing_id_2';
	const test_bun_name = 'Тестовая булка 1';
	const test_ing_1_name = 'Тестовый ингредиент 1';
	const test_ing_2_name = 'Тестовый ингредиент 2';
	const test_ingredients_fextures = 'ingredients.json';
	const test_ing_container = 'ing_container';
	const test_bun_top_container = 'bun_top_container';
	const test_bun_bottom_container = 'bun_bottom_container';

	it('drag-n-drop bun to ing_container', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_bun_id}]`).trigger('dragstart');
		cy.get(`[data-testid=${test_ing_container}]`).trigger('drop');
		cy.get(`[data-testid=${test_bun_top_container}]`).contains(test_bun_name);
		cy.get(`[data-testid=${test_bun_bottom_container}]`).contains(
			test_bun_name
		);
	});

	it('drag-n-drop bun to bun_top_container', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_bun_id}]`).trigger('dragstart');
		cy.get(`[data-testid=${test_bun_top_container}]`).trigger('drop');
		cy.get(`[data-testid=${test_bun_top_container}]`).contains(test_bun_name);
		cy.get(`[data-testid=${test_bun_bottom_container}]`).contains(
			test_bun_name
		);
	});

	it('drag-n-drop bun to bun_top_container', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_bun_id}]`).trigger('dragstart');
		cy.get(`[data-testid=${test_bun_bottom_container}]`).trigger('drop');
		cy.get(`[data-testid=${test_bun_top_container}]`).contains(test_bun_name);
		cy.get(`[data-testid=${test_bun_bottom_container}]`).contains(
			test_bun_name
		);
	});

	it('drag-n-drop ingredient to ing_container', () => {
		cy.intercept('GET', api_url, { fixture: test_ingredients_fextures });
		cy.visit('/');
		cy.get(`[data-testid=${test_ingredient_1_id}]`).trigger('dragstart');
		cy.get(`[data-testid=${test_ing_container}]`).trigger('drop');
		cy.get(`[data-testid=${test_ingredient_2_id}]`).trigger('dragstart');
		cy.get(`[data-testid=${test_ing_container}]`).trigger('drop');

		cy.get(`[data-testid=${test_ing_container}]`).contains(test_ing_1_name);
		cy.get(`[data-testid=${test_ing_container}]`).contains(test_ing_2_name);
	});
});
