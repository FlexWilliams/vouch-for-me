<script lang="ts">
	import { goto } from '$app/navigation';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import type { User } from '$lib/user/user';
	import { VibrationService } from '$lib/utils/vibration-service';

	interface HeaderProps {
		user: Partial<User> | undefined;
	}

	let { user }: HeaderProps = $props();

	let toggleAnimations = $derived(allyState.toggleAnimations);

	async function handleSignOut(): Promise<void> {
		VibrationService.vibrate();
		await goto('/auth/sign-out', { invalidateAll: true });
	}
</script>

{#if user?.id}
	<button type="submit" onclick={() => handleSignOut()}>Sign Out</button>
{:else}
	<a href="/"><h1><span class:no-animate={!toggleAnimations}>Vouch for Me</span></h1></a>
{/if}

<style lang="scss">
	@use '../../styles/animations/float';
	@use '../../styles/fonts/fonts';

	h1 {
		@include fonts.chango;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-weight: bold;
		color: #ede7f6;

		span {
			@include float.floating;
		}

		span.no-animate {
			animation-play-state: paused;
		}
	}

	button {
		position: absolute;
		top: 2rem;
		right: 2rem;
		max-width: 10rem;
		display: flex;
		align-self: flex-end;
		padding: 0.25rem 1rem;
		background-color: white;
		border-radius: 4rem;
	}
</style>
