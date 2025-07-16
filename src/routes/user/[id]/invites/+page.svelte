<script lang="ts">
	import type { Invite } from '$lib/invite/model/invite';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService.js';
	import { untrack } from 'svelte';
	import { fade } from 'svelte/transition';

	let { form } = $props();

	let invites: Invite[] = $state([]);

	let email: string = $state('');

	let rating: number = $state(5);

	let showInviteForm = $state(false);

	$effect(() => {
		if (form?.success) {
			untrack(() => {
				if (form.invite) {
					invites.push(form.invite);
					ToastrService.alert(`Invite sent to: ${form.invite.inviteeEmail}.`);
				}
			});
		}
	});
</script>

<div class="container">
	<h2>My Invites</h2>

	<ul>
		{#each invites as invite}
			<li class="invite-card">
				<p>Invitee: <span>{invite?.inviteeEmail}</span></p>
				<p>Accepted?: <span>{invite?.accepted ? 'Yes' : 'No'}</span></p>
			</li>
		{:else}
			<li>
				<p>No Invites</p>
			</li>
		{/each}
	</ul>
	<button class="invite" onclick={() => (showInviteForm = !showInviteForm)}>Invite Someone</button>
	{#if showInviteForm}
		<form name="invite" method="POST" action="?/sendInvite" transition:fade>
			<div class="form-field">
				<label for="email"><span class="form-field-required">*</span>Email:</label>
				<input id="email" type="email" name="email" bind:value={email} autocomplete="off" />
			</div>
			<div class="form-field">
				<label for="rating"><span class="form-field-required">*</span>Trust Rating (1 - 10):</label>
				<input id="rating" name="rating" type="number" min="1" max="10" bind:value={rating} />
			</div>
			<button
				type="button"
				aria-label="Close"
				class="close"
				onclick={() => (showInviteForm = !showInviteForm)}>X</button
			>
			<button type="submit" class="submit" disabled={!email || !rating}>Send Invite</button>
		</form>
	{/if}
</div>

<style lang="scss">
	.container {
		// TODO: centralize these and use within snippet
		padding: 1rem;
		background-color: #eeeeee;
		height: 100%;
		border-radius: 1rem;
		position: relative;
	}

	h2 {
		font-size: 1.5rem;
		text-decoration: underline;
		text-align: center;
		margin-bottom: 2rem;
	}

	ul {
		display: flex;
		flex-direction: column;

		li {
			p {
				text-align: center;
			}
		}

		li.invite-card {
			text-align: left;
			padding: 1rem;
			border: 1px solid rebeccapurple;
			border-radius: 0.5rem;
			background-color: white;

			p {
				text-align: left;
				margin: 1rem 0;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	form {
		position: absolute;
		top: 0;
		left: 0;
		padding: 2rem;
		height: 100%;
		width: 100%;
		background-color: #eeeeee;
		display: flex;
		flex-direction: column;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;

		label {
			font-size: 1.25rem;
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

	button.invite {
		position: absolute;
		right: 2rem;
		bottom: 2rem;
		color: #ffffff;
		background-color: #81d4fa;
		font-size: 1rem;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	button.close {
		width: 3rem;
		height: 3rem;
		border-radius: 3rem;
		position: absolute;
		right: 2rem;
		bottom: 2rem;
		color: #ffffff;
		background-color: #81d4fa;
	}

	button.submit {
		color: #ffffff;
		background-color: #81d4fa;
		font-size: 1rem;
		border-radius: 0.5rem;
		padding: 0.5rem;

		&:disabled {
			background-color: gray;
			cursor: not-allowed;
		}
	}

	.invite-card {
	}
</style>
