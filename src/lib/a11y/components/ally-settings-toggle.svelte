<script lang="ts">
	import { allyState, allyState$$toggleAnimations } from '../state/ally-state.svelte';

	let { closeAllySettings } = $props();

	let toggleAnimations = $derived(allyState.toggleAnimations);

	function handleToggleAnimationsChange(): void {
		allyState$$toggleAnimations(toggleAnimations);
	}
</script>

<form name="accessibility-settings">
	<h3>Accessibility Settings</h3>

	<label for="animations">Toggle Animations?</label>
	<input
		id="animations"
		name="animations"
		type="checkbox"
		bind:checked={toggleAnimations}
		onchange={handleToggleAnimationsChange}
	/>
</form>

<button type="button" aria-label="Close accessibility settings" onclick={() => closeAllySettings()}>
	X
</button>

<style lang="scss">
	form {
		padding: 2rem 0;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	button {
		background-color: transparent;
		border: none;
		border-radius: 10rem;
		position: absolute;
		bottom: 4rem;
		right: 2rem;
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 10rem;
	}
</style>
