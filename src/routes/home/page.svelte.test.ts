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
				}
			}
		});

		const welcomeText = page.getByText(`Welcome ${user.id}!`);
		await expect.element(welcomeText).toBeVisible();
	});
});
