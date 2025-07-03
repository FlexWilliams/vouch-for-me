import { createRawSnippet, type Snippet } from 'svelte';

export function getEmptyChildrenArray(): Snippet<[]> {
	return createRawSnippet(() => ({
		render: () => ``,
		setup: () => {}
	}));
}
