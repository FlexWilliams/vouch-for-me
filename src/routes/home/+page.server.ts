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
		id: crypto.randomUUID(),
		inviteeId: crypto.randomUUID()
	};

	return {
		user
	};
};
