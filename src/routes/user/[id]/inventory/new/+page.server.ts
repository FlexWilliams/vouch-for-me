import { Logger } from '$lib/logging/logger';
import type { Actions } from './$types';

export const actions = {
	addItem: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const photo = data.get('photo') as File;

		Logger.debug(`[Page][addItem] - adding item to user inventory...`);

		Logger.debug(`${name}`);
		Logger.debug(`${description}`);
		Logger.debug(`${photo?.name}`);
		Logger.debug(`${photo?.size}`);

		Logger.debug(`[Page][addItem] - item added successfully!`);

		return { success: true, item: { name, description } };
	}
} satisfies Actions;
