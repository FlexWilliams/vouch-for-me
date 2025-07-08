<script lang="ts">
	import { goto } from '$app/navigation';
	import { getMockInventoryItems, type InventoryItem } from '$lib/inventory/inventory.js';
	import { debounceTime, Subject, Subscription, tap } from 'rxjs';
	import { onDestroy, onMount } from 'svelte';

	let { children } = $props();

	let inventoryItems = $state(getMockInventoryItems());

	const subscriptions: Subscription[] = [];

	const _inventorySearchText$ = new Subject<string>();
	const inventorySearchText$ = _inventorySearchText$.asObservable();

	function handleRentClick(itemId: string): void {
		goto(`./inventory/${itemId}`);
	}

	function handleInventoryItemClick(evt: Event): void {
		const target = evt.target as HTMLElement;
		target?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
	}

	function handleSearchTextChange(event: Event): void {
		const value = (event.target as HTMLInputElement)?.value;
		_inventorySearchText$.next(value);
	}

	function listenForTextChanges(): void {
		subscriptions.push(
			inventorySearchText$
				.pipe(
					debounceTime(500),
					tap((text) => {
						inventoryItems = filterInventoryItems(text);
					})
				)
				.subscribe()
		);
	}

	function filterInventoryItems(text: string): InventoryItem[] {
		if (!text || !text.trim()) {
			return getMockInventoryItems();
		}

		return getMockInventoryItems().filter(
			(i) =>
				i.name.split(' ').some((s) => s.toLowerCase().includes(text.toLowerCase())) ||
				i.tags.some((t) => t.toLowerCase().includes(text.toLowerCase()))
		);
	}

	onMount(() => {
		listenForTextChanges();
	});

	onDestroy(() => {
		subscriptions.forEach((sub) => sub.unsubscribe());
	});
</script>

<div class="user-inventory-page">
	<h2>Ian's Inventory</h2>

	<form name="inventory-search">
		<div class="form-control">
			<label for="search">Search</label>
			<input id="search" type="text" name="search" onkeyup={handleSearchTextChange} />
		</div>
	</form>

	<ul>
		{#each inventoryItems as item}
			<li>
				<button onclick={(evt) => handleInventoryItemClick(evt)}><span>{item.name}</span></button>
				<button class="rent" onclick={() => handleRentClick(item.id)}>Rent</button>
			</li>
		{:else}
			<li class="no-items-match-criteria">No items match your search criteria</li>
		{/each}
	</ul>
</div>

{@render children()}

<style lang="scss">
	@use '$lib/styles/forms/forms.scss';
	@use '$lib/styles/overlay/z-index.scss';

	.user-inventory-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: #eeeeee;
		padding: 1rem;
		border-radius: 1rem;
	}

	h2 {
		text-align: center;
		text-decoration: underline;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	ul {
		display: flex;
		overflow: auto;
		padding: 1rem 0;
	}

	li {
		position: relative;
		min-width: 10rem;
		height: 10rem;
		background-color: white;
		margin-right: 1rem;
		border-radius: 0.5rem;

		button {
			&:first-of-type {
				width: 100%;
				height: 100%;
				padding: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	li.no-items-match-criteria {
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	button.rent {
		z-index: z-index.$inventory-item-rent-button-z-index;
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		background-color: #81d4fa; // TODO: store in color.scss!
		border-radius: 0.5rem;
		width: 4rem;
	}
</style>
