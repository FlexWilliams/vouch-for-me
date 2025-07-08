import { createMockUser } from '$lib/user/user';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/home/+page.svelte', () => {
	it('should render welcome text', async () => {
		const user = createMockUser();
		render(Page, {
			props: {
				data: {
					user
				},
			}
		});

		await expect.element(page.getByText(`View Your Invitee's Inventory?`)).toBeVisible();
		await expect.element(page.getByText(`Continue Profile Setup`)).toBeVisible();
	});
});
