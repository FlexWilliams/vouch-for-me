import { expect, test } from 'vitest';
import { allyState, allyState$$toggleAnimations } from './ally-state.svelte';

test('state should be defined', () => {
	let state = allyState;

	expect(state).toBeDefined();
});

test('initial state should contain correct default values', () => {
	let state = allyState;

	expect(state.toggleAnimations).toBe(true);
});

test('toggleAnimations', () => {
	let state = allyState;

	expect(state.toggleAnimations).toBe(true);
	allyState$$toggleAnimations(false);
	expect(state.toggleAnimations).toBe(false);
	allyState$$toggleAnimations(true);
	expect(state.toggleAnimations).toBe(true);
});
