<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import gearIcon from '$lib/assets/images/gear.svg';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { VibrationService } from '$lib/utils/vibration-service';
	import { onMount, untrack } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	let email: string = $state('');

	let loading: boolean = $state(false);

	let { form, data }: PageProps = $props();

	onMount(() => {
		afterNavigate((e) => {
			const route = e.from?.route?.id;

			if (!route) {
				return;
			}

			if (route !== '/' && !data.user) {
				ToastrService.alert(`Successfully signed out!`);
			}
		});
	});

	$effect(() => {
		if (!form?.error) {
			return;
		}

		untrack(() => {
			if (form.error === 'Not registered') {
				ToastrService.alert('Email not registered');
			}
		});
	});
</script>

<form name="sign-in-form" method="POST" action="?/signInViaEmail">
	<section class="form-field">
		{#if form?.emailMissing}
			<p class="form-field-error">The email field is required</p>
		{/if}
		<label for="email"><span class="form-field-required">*</span>Email:</label>
		<input id="email" type="email" name="email" bind:value={email} />
	</section>
	<button
		type="submit"
		class="submit-button"
		disabled={!email || loading}
		onclick={() => VibrationService.vibrate()}
		>Send Magic Link
		{#if loading}
			<img
				src={gearIcon}
				alt="Loading..."
				class="loading"
				transition:fade={{ delay: 100, duration: 250 }}
			/>
		{/if}</button
	>
</form>

<style lang="scss">
	@use '../lib/styles/animations/spin';

	form {
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

	.form-field-error {
		color: red;
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
