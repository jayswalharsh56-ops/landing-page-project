import { writable } from 'svelte/store';

function createCart() {
	const stored = typeof localStorage !== 'undefined'
		? localStorage.getItem('cart')
		: null;

	const initialValue = stored ? JSON.parse(stored) : [];

	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,

		set(value) {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('cart', JSON.stringify(value));
			}
			set(value);
		},

		update(callback) {
			update(items => {
				const updated = callback(items);

				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('cart', JSON.stringify(updated));
				}

				return updated;
			});
		},

		clear() {
			if (typeof localStorage !== 'undefined') {
				localStorage.removeItem('cart');
			}
			set([]);
		}
	};
}

export const cart = createCart();