<script lang="ts">
	import { fade } from 'svelte/transition';

	let email: string = $state('');

	let loading: boolean = $state(false);

	// TODO: handle via svelte
	async function handleFormSubmit(): Promise<void> {
		console.log(email);

		loading = true;

		// TODO: impl during VOUCH-003, mocking for now
		setTimeout(() => {
			loading = false;
		}, 2000);
	}
</script>

<form class="form" name="sign-in-form" onsubmit={() => handleFormSubmit()}>
	<section class="form-field">
		<label for="email"><span class="form-field-required">*</span>Email:</label>
		<input id="email" type="email" bind:value={email} />
	</section>
	<button type="submit" class="submit-button" disabled={!email || loading}
		>Send Magic Link
		{#if loading}
			<img
				src="/images/gear.png"
				alt="Loading..."
				class="loading"
				transition:fade={{ delay: 100, duration: 250 }}
			/>
		{/if}</button
	>
</form>

<style lang="scss">
	@use '../lib/styles/animations/spin';

	.form {
		max-width: 36rem;
		align-self: center;
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;

		label {
			font-size: 1.25rem;
			color: #dddddd;
		}

		input {
			height: 2rem;
			border-radius: 1rem;
		}
	}

	.form-field-required {
		color: red;
		margin-right: 0.5rem;
	}

	.submit-button {
		position: relative;
		cursor: pointer;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		border-radius: 4rem;
		padding: 0.5rem;
		color: #ffffff;
		background-color: #81d4fa;
		font-weight: bold;

		&:disabled {
			background-color: gray;
			cursor: not-allowed;
		}
	}

	.loading {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		right: 1rem;

		@include spin.spin360;
	}
</style>
