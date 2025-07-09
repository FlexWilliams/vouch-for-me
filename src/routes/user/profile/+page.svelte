<script lang="ts">
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import { fade } from 'svelte/transition';

	let toggleAnimations = $derived(allyState.toggleAnimations);
</script>

<section
	class="user-profile"
	in:fade={{ duration: toggleAnimations ? 400 : 0, delay: toggleAnimations ? 200 : 0 }}
	out:fade={{ duration: toggleAnimations ? 200 : 0 }}
>
	<h2>My Profile</h2>
</section>

<style lang="scss">
	section.user-profile {
		// TODO: centralize styles, duped from inventory search page
		padding: 1rem 0;
		background-color: #eeeeee;
		height: 100%;
		border-radius: 1rem;

		h2 {
			text-align: center;
			text-decoration: underline;
			font-size: 1.5rem;
		}
	}
</style>
