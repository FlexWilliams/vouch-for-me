<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<a href="/"><h1>Vouch for Me</h1></a>
</header>
<main>
	{@render children()}
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
</style>
