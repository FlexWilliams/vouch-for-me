import { Logger } from '$lib/logging/logger';
import { sessionId } from '$lib/server/headers';
import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import type { Actions } from './$types';

export const actions = {
	signInViaEmail: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		Logger.debug(`[Page][signInViaEmail] - user attempting to sign in with email: ${email}`);

		if (!email) {
			Logger.debug(`[FormAction][signInViaEmail] - provided email is empty.`);
			return fail(400, { email, emailMissing: true });
		}

		// TODO: remove and imply real auth solution, fakey for UI
		cookies.set(sessionId, randomUUID(), {
			path: '/',
			maxAge: 259200, // 3 days
			httpOnly: true
		});

		return redirect(303, '/home');
	}
} satisfies Actions;
