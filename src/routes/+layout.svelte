<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import A11ySettingsToggle from '$lib/a11y/components/Ally-settings-toggle.svelte';
	import Header from '$lib/layout/components/Header.svelte';
	import Toastr from '$lib/notification/toastr/components/Toastr.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children, data } = $props();

	let onRootPage = $state(true);

	onMount(() => {
		afterNavigate((e) => {
			const route = e.to?.route?.id;

			onRootPage = route === '/';

			if (route === '/home' && !data?.user?.id) {
				goto('/');
			} else if (route === '/' && data?.user?.id) {
				goto('/home');
			}
		});
	});
</script>

<Toastr />

<header class:minimized={!onRootPage}>
	<Header user={data?.user} />
</header>
<main class:maximized={!onRootPage}>
	{#await data then _}
		{@render children()}
	{/await}
</main>
<footer></footer>

<A11ySettingsToggle />

<style lang="scss">
	@use '../lib/styles/animations/float';

	header {
		height: 25%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	header.minimized {
		height: 15%;
	}

	main {
		height: 50%;
		width: 100%;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	main.maximized {
		height: 60%;
	}

	footer {
		height: 25%;
		width: 100%;
	}
</style>
