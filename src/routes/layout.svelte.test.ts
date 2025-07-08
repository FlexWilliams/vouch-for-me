import { getEmptyChildrenArray } from '$lib/testing/test-helpers';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+layout.svelte';

describe('/+layout.svelte', () => {
	it.skip('should display correct title', async () => {
		render(Page, {
			props: {
				children: getEmptyChildrenArray(),
				data: {
					user: undefined
				}
			}
		});

		const heading = page.getByRole('heading', { level: 1, name: 'Vouch for Me', exact: true });
		await expect.element(heading).toBeInTheDocument();
		await expect.element(heading).toBeVisible();
	});
});
