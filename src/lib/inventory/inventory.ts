// TODO: remove `inventory` from all phrasing and naming, find better word (even make one up!)

import macbook from '$lib/assets/images/inventory-items/2019_macbook_pro_16gb.png';
import cooler from '$lib/assets/images/inventory-items/25_quart_travel_cooler.png';
import bluray from '$lib/assets/images/inventory-items/bluray.png';
import nintendo_switch from '$lib/assets/images/inventory-items/nintendo_switch.png';
import pressure_washer from '$lib/assets/images/inventory-items/pressure_washer.png';
import project_debut from '$lib/assets/images/inventory-items/project_debut_record_player.jpg';
import raspberry from '$lib/assets/images/inventory-items/raspberry_pi_4_model_b.png';
import rice_cooker from '$lib/assets/images/inventory-items/rice_cooker.png';
import rotary_hammer from '$lib/assets/images/inventory-items/rotary_hammer.png';
import staple_gun from '$lib/assets/images/inventory-items/staple_gun.png';
import yamaha from '$lib/assets/images/inventory-items/yamaha.png';

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
		imageName: rotary_hammer
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645c',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645d',
		name: 'Rice Cooker',
		tags: ['Cooking', 'Food'],
		trustLevel: 1,
		imageName: rice_cooker
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645e',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645f',
		name: 'Pressure Washer',
		tags: ['Cleaning', 'Water'],
		trustLevel: 5,
		imageName: pressure_washer
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645g',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645h',
		name: 'Staple Gun',
		tags: ['DIY', 'Home Repairs'],
		trustLevel: 3,
		imageName: staple_gun
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645i',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645j',
		name: 'External USB Blu-ray Drive (RW)',
		tags: ['USB', 'Blu-ray', 'Bluray'],
		trustLevel: 5,
		imageName: bluray
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645k',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645l',
		name: 'Yamaha PSR-353 61-Key Digital Keyboard',
		tags: ['Yamaha', 'Keyboard'],
		trustLevel: 7,
		imageName: yamaha
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645m',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645n',
		name: '2019 Macbook Pro 16GB',
		tags: ['Computer', 'Laptop', 'MacOs'],
		trustLevel: 8,
		imageName: macbook
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645o',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645p',
		name: 'Raspberry Pi 4 Model B',
		tags: ['Computer', 'Microcontroller', 'IoT', 'Robotics'],
		trustLevel: 5,
		imageName: raspberry
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645q',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645r',
		name: 'Nintendo Switch w/ Assorted Games',
		tags: ['Gaming', 'Friends'],
		trustLevel: 7,
		imageName: nintendo_switch
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645s',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645t',
		name: '25 Quart Travel Cooler',
		tags: ['Road Trip', 'Camping', 'Picnic', 'Outdoors', 'Fishing', 'BBQ'],
		trustLevel: 6,
		imageName: cooler
	});

	items.push({
		id: 'a77bb043-4f21-4144-95f3-03e5e5f2645u',
		ownerId: 'a77bb043-4f21-4144-95f3-03e5e5f2645v',
		name: 'Project Debut Record Player',
		tags: ['Vinyl', 'Music', 'Vintage'],
		trustLevel: 9,
		imageName: project_debut
	});

	return items;
}
