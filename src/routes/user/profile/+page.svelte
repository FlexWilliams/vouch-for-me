<script lang="ts">
	import { enhance } from '$app/forms';
	import { allyState } from '$lib/a11y/state/ally-state.svelte';
	import checkmark from '$lib/assets/images/checkmark.svg';
	import { ToastrService } from '$lib/notification/toastr/services/ToastrService';
	import { untrack } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { form, data }: PageProps = $props();

	let toggleAnimations = $derived(allyState.toggleAnimations);

	let profilePic: File | null = $state(null);

	let userName: string | null = $state(null);

	let saving = $state(false);

	function handleProfilePicChange(event: Event): void {
		const files: FileList = (event.target as any)?.files;

		if (!files || files.length === 0) {
			return;
		}

		profilePic = files.item(0);
	}

	$effect(() => {
		if (form?.success) {
			untrack(() => {
				ToastrService.alert(`Profile Saved!`);
			});
		}
	});
</script>

<section
	class="user-profile"
	in:fade={{ duration: toggleAnimations ? 400 : 0, delay: toggleAnimations ? 200 : 0 }}
	out:fade={{ duration: toggleAnimations ? 200 : 0 }}
>
	<h2>My Profile</h2>

	<form
		name="user-profile"
		method="POST"
		action="?/updateProfile"
		use:enhance
		enctype="multipart/form-data"
	>
		<div>
			<div class="form-field">
				<label for="username">Username:</label>
				<input id="username" name="username" bind:value={userName} />
			</div>
			<div class="form-field row">
				<div>
					<label for="profile-pic">
						<button type="button" onclick={(e) => e?.currentTarget?.parentElement?.click()}>
							Add Profile Pic
						</button>
					</label>
					<input
						id="profile-pic"
						name="profile-pic"
						hidden
						type="file"
						accept="image/*"
						multiple={false}
						onchange={(evt) => handleProfilePicChange(evt)}
					/>
				</div>
				{#if profilePic}
					<img src={checkmark} alt="Checkmark icon" transition:fade />
				{/if}
			</div>
		</div>

		<button type="submit" class="save" disabled={!userName || saving}>Save</button>
	</form>
	<a href={`/user/${data?.user?.id}/inventory`} class="my-inventory">My Inventory</a>
</section>

<style lang="scss">
	section.user-profile {
		// TODO: centralize styles, duped from inventory search page
		padding: 1rem 0;
		background-color: #eeeeee;
		height: 100%;
		border-radius: 1rem;
		position: relative;

		h2 {
			text-align: center;
			text-decoration: underline;
			font-size: 1.5rem;
		}

		form {
			padding: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: calc(100% - 2rem);

			.form-field {
				display: flex;
				flex-direction: column;
				margin: 1rem;

				input {
					border-radius: 0.25rem;
				}

				img {
					max-width: 2.5rem;
					max-height: 2.5rem;
					// filter: saturate(100%) brightness(0%);
				}
			}

			.form-field.row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}

			label button {
				background-color: white;
				padding: 1rem;
				border-radius: 0.25rem;
			}

			button.save {
				align-self: flex-end;
				margin-right: 1rem;
				padding: 0.5rem 1rem;
				border-radius: 0.25rem;
				background-color: rebeccapurple;
				color: white;

				&:disabled {
					background-color: gray;
				}
			}
		}

		#profile-pic {
			display: none;
		}

		a.my-inventory {
			position: absolute;
			bottom: 2rem;
			left: 2rem;
			text-decoration: underline;
		}
	}
</style>
