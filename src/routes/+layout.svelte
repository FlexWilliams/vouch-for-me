<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { afterNavigate, goto } from '$app/navigation';
	import { Logger } from '$lib/logging/logger';
	import Toastr from '$lib/notification/toastr/components/Toastr.svelte';
	import { VibrationService } from '$lib/utils/vibration-service';

	let { children, data } = $props();

	onMount(() => {
		if (data?.user?.id) {
			goto('/home');
		}
	});

	async function handleSignOut(): Promise<void> {
		VibrationService.vibrate();
		data.user = undefined;
		await goto('/auth/sign-out', { invalidateAll: true });
	}
</script>

<Toastr />

<header>
	<a href="/"><h1>Vouch for Me</h1></a>

	{#if data.user?.id}
		<button type="submit" onclick={() => handleSignOut()}>Sign Out</button>
	{/if}
</header>
<main>
	{#await data then _}
		{@render children()}
	{/await}
</main>
<footer></footer>

<style lang="scss">
	header {
		height: 25%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	h1 {
		font-family: 'Chango-Regular', sans-serif;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-weight: bold;
		color: #ede7f6;
	}

	main {
		height: 50%;
		width: 100%;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	footer {
		height: 25%;
		width: 100%;
	}

	button {
		position: absolute;
		top: 2rem;
		right: 2rem;
		max-width: 10rem;
		display: flex;
		align-self: flex-end;
		padding: 0.25rem 1rem;
		background-color: white;
		border-radius: 4rem;
	}
</style>
