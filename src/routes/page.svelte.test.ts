import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render email sign-in form', async () => {
		render(Page);

		const emailControl = page.getByLabelText('Email:');
		await expect.element(emailControl).toBeInTheDocument();
		await expect.element(emailControl).toBeVisible();

		const submitButton = page.getByRole('button', { name: 'Send Magic Link' });
		await expect.element(submitButton).toBeVisible();
		await expect.element(submitButton).toBeDisabled();
	});
});
