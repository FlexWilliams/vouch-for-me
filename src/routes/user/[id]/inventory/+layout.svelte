<script lang="ts">
	import { goto } from '$app/navigation';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import { getMockInventoryItems, type InventoryItem } from '$lib/inventory/inventory';
	import { debounceTime, Subject, Subscription, tap } from 'rxjs';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, data } = $props();

	let inventoryItems = $state(getMockInventoryItems());

	let toggleAnimations = $derived(allyState.toggleAnimations);
	let isUsersInventory = $state(false);

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

	function clearSearchText(): void {
		const search = document.getElementById('search') as HTMLInputElement;
		if (search) {
			search.value = '';
			_inventorySearchText$.next('');
		}
	}

	onMount(() => {
		listenForTextChanges();

		isUsersInventory = data?.user?.id === window?.location?.pathname?.split('/')[2];
	});

	onDestroy(() => {
		subscriptions.forEach((sub) => sub.unsubscribe());
	});
</script>

<div
	class="user-inventory-page"
	in:fade={{ duration: toggleAnimations ? 400 : 0, delay: toggleAnimations ? 200 : 0 }}
	out:fade={{ duration: toggleAnimations ? 200 : 0 }}
>
	<div style="position: relative;height: 100%;">
		<h2>Ian's Inventory</h2>

		<form name="inventory-search">
			<div class="form-control">
				<label for="search">Search</label>
				<div class="search-bar">
					<input id="search" type="text" name="search" onkeyup={handleSearchTextChange} />
					<div>
						<button
							type="button"
							class="clear"
							aria-label="Clear search text?"
							onclick={clearSearchText}>X</button
						>
					</div>
				</div>
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

		{#if isUsersInventory}
			<button aria-label={`Add new item`} class="add-new">+</button>
		{/if}
	</div>

	{@render children()}
</div>

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
		overflow-x: auto;
		overflow-y: hidden;
		padding: 1.5rem 0;
	}

	li {
		position: relative;
		min-width: 12rem;
		height: 12rem;
		background-color: white;
		margin-right: 1rem;
		border-radius: 0.5rem;
		font-size: 1.25rem;

		&:last-of-type {
			margin-right: 0;
		}

		&:only-child {
			width: 100%;
		}

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
		text-align: center;
	}

	button.rent {
		z-index: z-index.$inventory-item-rent-button-z-index;
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		background-color: #81d4fa; // TODO: store in color.scss!
		border-radius: 0.5rem;
		width: 4rem;
		height: 2rem;
		font-size: 1rem;
	}

	.search-bar {
		position: relative;
		width: 100%;

		input {
			width: 100%;
		}

		div {
			position: absolute;
			height: 100%;
			top: 0;
			right: 0.5rem;
			display: flex;
			flex-direction: column;
			justify-content: center;

			button {
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 5rem;
				background-color: #5d5d5d;
				color: white;
			}
		}
	}

	button.add-new {
		position: absolute;
		right: 1rem;
		bottom: 2rem;
		background-color: #81d4fa;
		width: 3rem;
		height: 3rem;
		border-radius: 0.5rem;
		font-weight: bold;
	}
</style>
