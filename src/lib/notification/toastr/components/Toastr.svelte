<script lang="ts">
	import { take, tap, timer, type Subscription } from 'rxjs';
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { ToastrService, type ToastrConfig } from '../services/ToastrService';

	const defaultToastrDuration = 2000;

	const subsciprtions: Subscription[] = [];

	let toastr: ToastrConfig | null = $state(null);

	let toast: boolean = $state(false);

	function listenForToastrMessages(): Subscription {
		return ToastrService.toastr$
			.pipe(
				tap((toastrConfig) => {
					toastr = toastrConfig;

					toast = true;

					timer(toastr?.duration || defaultToastrDuration)
						.pipe(
							take(1),
							tap(() => {
								toast = false;
							})
						)
						.subscribe();
				})
			)
			.subscribe();
	}

	onMount(() => {
		subsciprtions.push(listenForToastrMessages());
	});

	onDestroy(() => {
		subsciprtions.forEach((sub) => sub.unsubscribe());
	});
</script>

{#if toast && toastr}
	<dialog id="notification-toastr" in:fly={{ y: -200 }} out:fade>
		<p>{toastr.message}</p>
	</dialog>
{/if}

<style lang="scss">
	dialog {
		position: absolute;
		z-index: 2; // TODO: make variable
		display: flex;
		align-items: center;
		justify-content: center;
		top: 2rem;
		margin: 1rem;
		padding: 1rem;
		border: none;
		border-radius: 1rem;
		width: calc(100% - 2rem);
		min-width: 20rem;
		min-height: 4rem;
		background-color: #81d4fa;

		box-shadow:
			rgba(17, 17, 26, 0.1) 0px 8px 24px,
			rgba(17, 17, 26, 0.1) 0px 16px 56px,
			rgba(17, 17, 26, 0.1) 0px 24px 80px;

		p {
			text-align: center;
			font-weight: bold;
			margin: 0;
			padding: 0;
		}
	}
</style>
