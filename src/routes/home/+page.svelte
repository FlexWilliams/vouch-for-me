<script lang="ts">
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		if (data?.user?.id) {
			ToastrService.alert(`Welcome ${data.user.id}!`);
		}
	});
</script>

<p>
	Welcome {data?.user?.id}!
</p>

<style lang="scss">
</style>
