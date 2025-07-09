<script lang="ts">
	import { goto } from '$app/navigation';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import arrowIcon from '$lib/assets/images/arrow.svg';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let toggleAnimations = $derived(allyState.toggleAnimations);

	onMount(() => {
		const key = 'vouchForMeSessionId';
		const session = window.sessionStorage.getItem(key);
		if (data?.user?.id && !session) {
			ToastrService.alert(`Welcome back ${data.user.name}!`); // TODO: store in session storage
			window.sessionStorage.setItem(key, crypto.randomUUID());
		}
	});
</script>

<div
	in:fade={{ duration: toggleAnimations ? 400 : 0, delay: toggleAnimations ? 200 : 0 }}
	out:fade={{ duration: toggleAnimations ? 200 : 0 }}
>
	{#if data?.user}
		<ul>
			<li>
				<button onclick={() => goto(`/user/${data?.user?.inviteeId}/inventory`)}
					>View Your Invitee's Inventory?</button
				>
			</li>
			<li>
				<button onclick={() => goto(`/user/profile`)}>Continue Profile Setup</button>
				<img src={arrowIcon} alt="Arrow icon" class="profile-setup-arrow" />
			</li>
		</ul>
	{/if}
</div>

<style lang="scss">
	@use '../../lib/styles/fonts/fonts';

	ul {
		list-style: none;
		margin: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	li {
		position: relative;
		height: 10rem;
		background-color: white;
		margin-bottom: 2rem;
		border-radius: 1rem;
		display: flex;
		justify-content: center;

		button {
			width: 100%;
		}
	}

	img.profile-setup-arrow {
		width: 1rem;
		height: 1rem;
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		transform: rotate(90deg);
	}
</style>
