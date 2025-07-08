import { Logger } from '$lib/logging/logger';
import { sessionId } from '$lib/server/headers';
import type { User } from '$lib/user/user';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionsId = cookies.get(sessionId);
	if (!sessionsId) {
		// TODO: create global auth guard...fakey for ui
		Logger.debug(`[Layout][Server] - no session id.`);
		return redirect(303, '/');
	}

	// TODO: get from backend, auth token...
	const user: User = {
		id: '6990517c-fc07-49dd-9857-e306e25f676c',
		inviteeId: '515b4b88-b942-4d62-918b-f35d393c0dd9',
		name: 'Alex'
	};

	return {
		user
	};
};
