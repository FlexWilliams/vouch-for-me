import { Logger } from '$lib/logging/logger';
import { sessionId } from '$lib/server/headers';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionsId = cookies.get(sessionId);

	if (!sessionsId) {
		Logger.debug(`[SignOutPage] - unable to log user out, no session id.`);
		return fail(400);
	}

	Logger.debug(`[SignOutPage] - signing out user with sessionId: ${sessionsId}`);

	// TODO: remove and imply real auth solution, fakey for UI
	cookies.delete(sessionId, { path: '/' });

	return redirect(303, '/');
};
