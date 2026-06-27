import { writable } from 'svelte/store';

function createCart() {
	const { subscribe, set, update } = writable([]);

	const isBrowser = typeof window !== 'undefined';

	if (isBrowser) {
		const saved = localStorage.getItem('cart');
		if (saved) set(JSON.parse(saved));
	}

	function save(items) {
		if (isBrowser) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}

	return {
		subscribe,

		add: (product) => {
			update(items => {
				const item = items.find(i => i.id === product.id);

				if (item) {
					item.qty += 1;
				} else {
					items.push({ ...product, qty: 1 });
				}

				save(items);
				return items;
			});
		},

		remove: (id) => {
			update(items => {
				const filtered = items.filter(i => i.id !== id);
				save(filtered);
				return filtered;
			});
		},

		clear: () => {
			set([]);
			if (isBrowser) localStorage.removeItem('cart');
		}
	};
}

export const cart = createCart();