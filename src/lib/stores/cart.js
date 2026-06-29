import { writable } from 'svelte/store';

function createCart() {
	const { subscribe, set, update } = writable([]);

	const isBrowser = typeof window !== 'undefined';

	// Load cart from localStorage
	if (isBrowser) {
		const saved = localStorage.getItem('cart');
		if (saved) set(JSON.parse(saved));
	}

	// Save cart to localStorage
	function save(items) {
		if (isBrowser) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}

	return {
		subscribe,

		// ADD TO CART
		add: (product) => {
			update(items => {
				const existing = items.find(i => i.id === product.id);

				let updated;

				if (existing) {
					updated = items.map(i =>
						i.id === product.id
							? { ...i, qty: i.qty + 1 }
							: i
					);
				} else {
					updated = [...items, { ...product, qty: 1 }];
				}

				save(updated);
				return updated;
			});
		},

		// REMOVE ITEM
		remove: (id) => {
			update(items => {
				const updated = items.filter(i => i.id !== id);
				save(updated);
				return updated;
			});
		},

		// CLEAR CART
		clear: () => {
			set([]);
			if (isBrowser) localStorage.removeItem('cart');
		}
	};
}

export const cart = createCart();