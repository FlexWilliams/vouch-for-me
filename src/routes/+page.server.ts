import { Logger } from '$lib/logging/logger';
import { sessionId } from '$lib/server/headers';
import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import type { Actions } from './$types';

const validEmails: string[] = [
	'alexwilliams4@protonmail.com',
	'alfredo.p@gmail.com',
	'ian.brand@gm.com'
];

export const actions = {
	signInViaEmail: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		Logger.debug(`[Page][signInViaEmail] - user attempting to sign in with email: ${email}`);

		if (!email) {
			Logger.debug(`[FormAction][signInViaEmail] - provided email is empty.`);
			return fail(400, { email, emailMissing: true });
		}

		if (!validEmails.some((v) => v === email.toLowerCase())) {
			Logger.debug(`[FormAction][signInViaEmail] - provided email is not registered`);
			return fail(403, { error: 'Not registered' });
		}

		// TODO: remove and imply real auth solution, fakey for UI
		cookies.set(sessionId, randomUUID(), {
			path: '/',
			maxAge: 259200, // 3 days
			httpOnly: true
		});

		Logger.debug(`[Page][signInViaEmail] - user successfully authenticated: ${email}`);

		return redirect(303, '/home');
	}
} satisfies Actions;
