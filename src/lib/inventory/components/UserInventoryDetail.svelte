<script lang="ts">
	import { goto } from '$app/navigation';
	import macbook from '$lib/assets/images/inventory-items/2019_macbook_pro_16gb.png';
	import cooler from '$lib/assets/images/inventory-items/25_quart_travel_cooler.png';
	import bluray from '$lib/assets/images/inventory-items/bluray.png';
	import nintendo_switch from '$lib/assets/images/inventory-items/nintendo_switch.png';
	import pressure_washer from '$lib/assets/images/inventory-items/pressure_washer.png';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { fade } from 'svelte/transition';
	import { getMockInventoryItems, type InventoryItem } from '../inventory';

	async function fetchInventoryItem(): Promise<InventoryItem | null> {
		const pathTokens = window.location.pathname.split('/');

		let itemId = pathTokens[pathTokens.length - 1];

		return getMockInventoryItems().find((i) => i.id === itemId) || null;
	}

    // REVIEW: revisit this when backend storage impl'd, for now quick n ez
	function getImage(itemName: string | undefined): string {
		if (itemName === '2019 Macbook Pro 16GB') {
			return macbook;
		} else if (itemName === '25 Quart Travel Cooler') {
			return cooler;
		} else if (itemName === 'Nintendo Switch w/ Assorted Games') {
			return nintendo_switch;
		} else if (itemName === 'External USB Blu-ray Drive (RW)') {
			return bluray;
		} else {
			return pressure_washer;
		}
	}

	function handleRentItemClick(): void {
		ToastrService.alert(`Request Sent!`);
		goto('../inventory');
	}
</script>

<article transition:fade>
	<div>
		{#await fetchInventoryItem()}
			<p>Loading...</p>
		{:then item}
			<h2>Ian's {item?.name}</h2>

			<img src={getImage(item?.name)} alt={`Ian's ${item?.name}`} />

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		{/await}

		<button onclick={handleRentItemClick}>Request to Rent</button>
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
				font-size: 1.5rem;
				text-decoration: underline;
				text-align: center;
			}

			img {
				margin: 2rem 0;
				max-height: 9rem;
				max-width: 16rem;
			}

			p {
				padding: 0 2rem;
				max-height: 24rem;
				overflow-y: auto;
			}

			button {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				min-width: 10rem;
				min-height: 3rem;
				border-radius: 0.5rem;
				background-color: #81d4fa;
			}
		}
	}
</style>
