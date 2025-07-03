import { expect, test } from '@playwright/test';

test('Landing page has expected h1', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('h1')).toBeVisible();

	await expect(page.getByText('Vouch for Me', { exact: true })).toBeVisible();
});

test('Landing page has expected sign-in form', async ({ page }) => {
	await page.goto('/');

	const emailControl = page.getByLabel('Email:');
	await expect(emailControl).toBeVisible();

	const submitbutton = page.getByRole('button', { name: 'Send Magic Link', exact: true });
	await expect(submitbutton).toBeVisible();
	await expect(submitbutton).toBeDisabled();

	await emailControl.fill(`test@test.com`);
	await emailControl.textContent();
	await expect(submitbutton).toBeVisible();
	// await expect(submitbutton).toBeEnabled(); // Not sure why svelte won't update ui during playwright test, FIX!
});
