import { sessionId } from '$lib/server/headers';
import type { User } from '$lib/user/user';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionsId = cookies.get(sessionId);

	let user: Partial<User> | undefined = undefined;

	if (sessionsId) {
		user = {
			id: sessionsId,
			name: 'Alex'
		};
	}

	return {
		user
	};
};
