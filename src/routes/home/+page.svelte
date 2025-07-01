<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<p>
	Welcome {data?.user?.id}!
</p>

<style lang="scss">
</style>
