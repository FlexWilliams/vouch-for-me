export interface User {
	id: string;
	inviteeId: string;
	name: string;
}

export function createMockUser(): User {
	const user: User = {
		id: '574795d8-7a32-432b-bc00-9827d76225fb',
		inviteeId: 'ac095d3e-2cde-4693-8b65-e60728a8c002',
		name: 'Mock User'
	};

	return user;
}
