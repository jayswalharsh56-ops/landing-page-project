import { writable } from 'svelte/store';

// load from localStorage
function createCart() {
	const stored = localStorage.getItem('cart');
	const initial = stored ? JSON.parse(stored) : [];

	const { subscribe, set, update } = writable(initial);

	// save helper
	const save = (items) => {
		localStorage.setItem('cart', JSON.stringify(items));
	};

	return {
		subscribe,

		add: (product) => {
			update((items) => {
				const existing = items.find(i => i.id === product.id);

				if (existing) {
					existing.qty += 1;
				} else {
					items.push({ ...product, qty: 1 });
				}

				save(items);
				return items;
			});
		},

		remove: (id) => {
			update((items) => {
				const newItems = items.filter(i => i.id !== id);
				save(newItems);
				return newItems;
			});
		},

		increase: (id) => {
			update((items) => {
				const item = items.find(i => i.id === id);
				if (item) item.qty += 1;

				save(items);
				return items;
			});
		},

		decrease: (id) => {
			update((items) => {
				const item = items.find(i => i.id === id);

				if (item && item.qty > 1) {
					item.qty -= 1;
				}

				save(items);
				return items;
			});
		},

		clear: () => {
			localStorage.removeItem('cart');
			set([]);
		}
	};
}

export const cart = createCart();