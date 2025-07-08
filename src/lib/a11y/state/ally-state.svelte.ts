export interface AllyState {
	toggleAnimations: boolean;
}

const initialAllyState: AllyState = {
	toggleAnimations: true
};

export const allyState = $state(initialAllyState);

/** Reducers */

/**
 * Sets the toggleAnimations
 */
export function allyState$$toggleAnimations(toggleAnimations: boolean): void {
	allyState.toggleAnimations = toggleAnimations;
}
