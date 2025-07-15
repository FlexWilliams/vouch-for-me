<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import type { User } from '$lib/user/user';
	import { VibrationService } from '$lib/utils/vibration-service';
	import { onMount } from 'svelte';

	interface HeaderProps {
		user: Partial<User> | undefined;
	}

	let { user }: HeaderProps = $props();

	let toggleAnimations = $derived(allyState.toggleAnimations);

	let currentRouteId: string | null = $state(null);

	async function handleSignOut(): Promise<void> {
		VibrationService.vibrate();
		window.sessionStorage.removeItem('vouchForMeSessionId');
		await goto('/auth/sign-out', { invalidateAll: true });
	}

	function handleUserProfileButtonClick(): void {
		if (currentRouteId !== '/user/profile') {
			goto('/user/profile');
		}
	}

	onMount(() => {
		afterNavigate((e) => {
			const route = e.to;
			if (route) {
				currentRouteId = route.route.id;
			}
		});
	});
</script>

{#if user?.id}
	<nav>
		<ul>
			<li>
				<button
					class="user-profile"
					aria-label="Go to User Profile page"
					onclick={handleUserProfileButtonClick}
				></button>
			</li>
			<li>
				<a href="/"><h1><span class:no-animate={!toggleAnimations}>Vouch for Me</span></h1></a>
			</li>
			<li>
				<button class="submit" type="submit" onclick={() => handleSignOut()}>Sign Out</button>
			</li>
		</ul>
	</nav>
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

	nav {
		height: 100%;
		display: flex;
		width: 100%;

		ul {
			align-items: center;
			display: flex;
			justify-content: space-between;
			padding: 0 2rem;
			width: 100%;

			li {
				h1 {
					font-size: 1.5rem;
					text-align: center;
					padding: 0;
					padding-top: 1rem;
				}
			}
		}
	}

	button.user-profile {
		width: 5rem;
		height: 5rem;
		border-radius: 10rem;
		background-color: white;
		background-image: url('$lib/assets/images/avatars/avatar.png');
		background-position: center; /* Center the image */
		background-repeat: no-repeat; /* Do not repeat the image */
		background-size: cover;
	}

	button.submit {
		max-width: 10rem;
		display: flex;
		padding: 0.25rem 0.75rem;
		background-color: white;
		border-radius: 0.5rem;
	}

	@media screen and (max-width: 448px) {
		button.user-profile {
			width: 3rem;
			height: 3rem;
		}

		button.submit {
			font-size: 0.75rem;
		}

		nav {
			ul {
				li {
					h1 {
						font-size: 1.25rem;
					}
				}
			}
		}
	}

	@media screen and (max-width: 375px) {
		nav {
			ul {
				li {
					h1 {
						font-size: 1rem;
					}
				}
			}
		}
	}
</style>
