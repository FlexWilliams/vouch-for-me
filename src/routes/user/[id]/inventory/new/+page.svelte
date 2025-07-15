<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { untrack } from 'svelte';
	import type { PageProps } from '../$types';

	let name: string | null = $state(null);

	let description: string | null = $state(null);

	let photo: File | null = $state(null);

	let saving = $state(false);

	let { form, data }: PageProps = $props();

	function handlePhotoChange(event: Event): void {
		const files: FileList = (event.target as any)?.files;

		if (!files || files.length === 0) {
			return;
		}

		photo = files.item(0);
	}

	$effect(() => {
		if (form?.success) {
			untrack(() => {
				saving = false;
				ToastrService.alert(`${form?.item?.name} Added!`);
				goto('../inventory');
			});
		}
	});
</script>

<div class="container">
	<div class="spacer"></div>
	<form
		name="new-item"
		class="new-item"
		method="POST"
		action="?/addItem"
		use:enhance
		enctype="multipart/form-data"
		onsubmit={() => (saving = true)}
	>
		<h2>Add new item to your inventory</h2>
		<div class="form-field">
			<label for="name"><span class="form-field-required">*</span>Name:</label>
			{#if form?.nameMissing}
				<p class="form-field-error">The email field is required</p>
			{/if}

			<input name="name" type="text" bind:value={name} />
		</div>
		<div class="form-field">
			<label for="description">Description (Optional):</label>
			<textarea name="description" bind:value={description}></textarea>
		</div>
		<div class="form-field">
			<label for="photo">
				<button
					type="button"
					aria-label="Add Photo"
					onclick={(e) => e?.currentTarget?.parentElement?.click()}
				>
					Photo (Optional)
				</button>
			</label>

			<input
				id="photo"
				name="photo"
				hidden
				type="file"
				accept="image/*"
				multiple={false}
				onchange={(evt) => handlePhotoChange(evt)}
			/>
		</div>

		<button type="submit" class="submit" disabled={!name || saving}>Add Item</button>
		<button type="button" aria-label="Close" class="close" onclick={() => window.history.back()}
			>X</button
		>
	</form>
	<div class="spacer"></div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10; //todo: make constant
	}

	.spacer {
		height: 15%;
	}

	form {
		height: 70%;
		max-width: 36rem;
		align-self: center;
		width: calc(100% - 4rem);
		padding: 1rem;
		background-color: #eeeeee;
		border-radius: 1rem;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	h2 {
		font-size: 1.5rem;
		text-align: center;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		padding: 1rem;

		label {
			font-size: 1rem;
			color: black;

			button {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				background-color: rebeccapurple;
				border-radius: 0.5rem;
				padding: 0.5rem;
				color: white;
			}
		}

		input {
			height: 2rem;
			border-radius: 1rem;
		}

		textarea {
			border-radius: 1rem;
		}
	}

	.form-field-required {
		color: red;
		margin-right: 0.5rem;
	}

	.form-field-error {
		color: red;
	}

	button.close {
		position: absolute;
		right: 2rem;
		bottom: 3rem;
		background-color: #81d4fa;
		width: 3rem;
		height: 3rem;
		border-radius: 0.5rem;
		font-weight: bold;
	}

	button.submit {
		margin-right: 1rem;
		background-color: aliceblue;
		width: min-content;
		min-width: 6rem;
		padding: 0.5rem;
		align-self: flex-end;
		border-radius: 0.5rem;

		&:disabled {
			background-color: gray;
		}
	}
</style>
