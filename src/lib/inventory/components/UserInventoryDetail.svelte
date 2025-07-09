<script lang="ts">
	import { goto } from '$app/navigation';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { getMockInventoryItems, type InventoryItem } from '../inventory';

	let toggleAnimations = $derived(allyState.toggleAnimations);

	async function fetchInventoryItem(): Promise<InventoryItem | null> {
		const pathTokens = window.location.pathname.split('/');

		let itemId = pathTokens[pathTokens.length - 1];

		return getMockInventoryItems().find((i) => i.id === itemId) || null;
	}

	function handleRentItemClick(): void {
		ToastrService.alert(`Request Sent!`);
		goto('../inventory');
	}

	function setFocus(): void {
		const closeButton = document.getElementById('close-button');
		if (closeButton) {
			closeButton.focus();
		}
	}

	onMount(() => {
		setFocus();
	});
</script>

<article transition:fade={{ duration: toggleAnimations ? 400 : 0 }}>
	<div>
		<button
			id="close-button"
			aria-label="Go back to Ian's Inventory"
			class="close"
			onclick={() => window.history.back()}>X</button
		>

		{#await fetchInventoryItem()}
			<p>Loading...</p>
		{:then item}
			<h2>Ian's {item?.name}</h2>

			<img src={item?.imageName} alt={`Ian's ${item?.name}`} />

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		{/await}

		<button onclick={handleRentItemClick} class="rent">Request to Rent</button>
	</div>
</article>

<style lang="scss">
	@use '$lib/styles/overlay/z-index.scss';

	article {
		position: absolute;
		z-index: z-index.$inventory-item-rent-button-z-index;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #cdcdcded;
		padding: 2rem;

		div {
			position: relative;
			background-color: white;
			width: 100%;
			height: 100%;
			border-radius: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 2rem 1rem;

			h2 {
				margin-top: 1rem;
				font-size: 1.5rem;
				text-decoration: underline;
				text-align: center;
			}

			img {
				margin: 1.5rem 0;
				min-height: 9rem;
				max-height: 9rem;
				min-width: 16rem;
				max-width: 16rem;
			}

			p {
				padding: 0 2rem;
				max-height: 16rem;
				overflow-y: auto;
			}

			button.rent {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				min-width: 10rem;
				min-height: 3rem;
				border-radius: 0.5rem;
				background-color: #81d4fa;
			}

			button.close {
				position: absolute;
				top: 1rem;
				right: 1rem;
				width: 2rem;
				height: 2rem;
				border-radius: 5rem;
				background-color: #81d4fa;
			}
		}
	}
</style>
