// TODO: remove `inventory` from all phrasising and naming, find better word (even make one up!)

export interface InventoryItem {
	id: string;
	ownerId: string;
	name: string;
	tags: string[];
	trustLevel: number;
	imageName: string;
}

export function getMockInventoryItems(): InventoryItem[] {
	let items: InventoryItem[] = [];

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645a',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645b',
		name: 'Rotary Hammer',
		tags: ['DIY', 'Construction', 'Home Repairs', 'Landscaping', 'Remodeling'],
		trustLevel: 7,
		imageName: 'rotary_hammer.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645c',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645d',
		name: 'Rice Cooker',
		tags: ['Cooking', 'Food'],
		trustLevel: 1,
		imageName: 'rice_cooker.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645e',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645f',
		name: 'Pressure Washer',
		tags: ['Cleaning', 'Water'],
		trustLevel: 5,
		imageName: 'pressure_washer.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645g',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645h',
		name: 'Staple Gun',
		tags: ['DIY', 'Home Repairs'],
		trustLevel: 3,
		imageName: 'staple_gun.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645i',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645j',
		name: 'External USB Blu-ray Drive (RW)',
		tags: ['USB', 'Blu-ray', 'Bluray'],
		trustLevel: 5,
		imageName: 'bluray.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645k',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645l',
		name: 'Yamaha PSR-353 61-Key Digital Keyboard',
		tags: ['Yamaha', 'Keyboard'],
		trustLevel: 7,
		imageName: 'yamaha.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645m',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645n',
		name: '2019 Macbook Pro 16GB',
		tags: ['Computer', 'Laptop', 'MacOs'],
		trustLevel: 8,
		imageName: '2019_macbook_pro_16gb.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645o',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645p',
		name: 'Raspberry Pi 4 Model B',
		tags: ['Computer', 'Microcontroller', 'IoT', 'Robotics'],
		trustLevel: 5,
		imageName: 'raspberry_pi_4_model_b.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645q',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645r',
		name: 'Nintendo Switch w/ Assorted Games',
		tags: ['Gaming', 'Friends'],
		trustLevel: 7,
		imageName: 'nintendo_switch.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645s',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645t',
		name: '25 Quart Travel Cooler',
		tags: ['Road Trip', 'Camping', 'Picnic', 'Outdoors', 'Fishing', 'BBQ'],
		trustLevel: 6,
		imageName: '25_quart_travel_cooler.png'
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645u',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645v',
		name: 'Project Debut Record Player',
		tags: ['Vinyl', 'Music', 'Vintage'],
		trustLevel: 9,
		imageName: 'project_debut_record_player.jpg'
	});

	return items;
}
