import type { Invite } from '$lib/invite/model/invite';
import { Logger } from '$lib/logging/logger';
import type { Actions } from './$types';

export const actions = {
	sendInvite: async ({ request }) => {
		const data = await request.formData();
		const inviteeEmail = data.get('email') as string;
		const rating = parseInt(data.get('rating') as string);

		if (Number.isNaN(rating)) {
			return { success: false, errors: { rating: 'Invalid' } };
		}

		Logger.debug(`[Page][sendInvite] - Sending invite to: ${inviteeEmail} ...`);

		Logger.debug(`${inviteeEmail}`);
		Logger.debug(`${rating}`);

		Logger.debug(`[Page][sendInvite] - Invite sent to: ${inviteeEmail}. Awaiting acceptance...`);

		const invite: Invite = {
			id: crypto.randomUUID(),
			inviteeEmail,
			createdOn: new Date().toISOString(),
			rating,
			accepted: false
		};

		return { success: true, invite };
	}
} satisfies Actions;
