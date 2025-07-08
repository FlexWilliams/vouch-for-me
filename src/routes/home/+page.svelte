<script lang="ts">
	import { goto } from '$app/navigation';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		if (data?.user?.id) {
			ToastrService.alert(`Welcome ${data.user.id}!`); // TODO: store in session storage
		}
	});
</script>

{#if data?.user}
	<ul>
		<li>
			<button onclick={() => goto(`/user/${data?.user?.inviteeId}/inventory`)}
				>View Your Invitee's Inventory?</button
			>
		</li>
		<li>
			<button onclick={() => goto(`/user/${data?.user?.id}/profile`)}>Continue Profile Setup</button
			>
			<img src="/images/arrow.svg" alt="Arrow icon" class="profile-setup-arrow" />
		</li>
	</ul>
{/if}

<style lang="scss">
	@use '../../lib/styles/fonts/fonts';

	ul {
		list-style: none;
		margin: 0;
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
			@include fonts.chango;
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
