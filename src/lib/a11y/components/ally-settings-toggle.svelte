<script lang="ts">
	import allyIcon from '$lib/assets/images/universal-access.svg';
	import { fade } from 'svelte/transition';
	import { allyState } from '../state/ally-state.svelte';
	import AllySettings from './Ally-settings.svelte';

	let toggleA11ySettings = $state(false);

	let toggleAnimations = $derived(allyState.toggleAnimations);
</script>

<button
	type="button"
	aria-label="Open accessibility settings"
	onclick={() => (toggleA11ySettings = !toggleA11ySettings)}
>
	<img src={allyIcon} alt={`Universal person icon`} />
</button>
{#if toggleA11ySettings}
	<div class="ally-settings-container" transition:fade={{ duration: toggleAnimations ? 400 : 0 }}>
		<AllySettings closeAllySettings={() => (toggleA11ySettings = false)} />
	</div>
{/if}

<style lang="scss">
	button {
		background-color: transparent;
		border: none;
		border-radius: 10rem;
		position: absolute;
		bottom: 2rem;
		right: 2rem;
	}

	img {
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 10rem;
	}

	.ally-settings-container {
		position: absolute;
		top: 0;
		left: 0;
		padding: 2rem;
		background-color: #cdcdcded;
		z-index: 2; // TODO: make constant
		width: 100%;
		height: 100%;
	}
</style>
