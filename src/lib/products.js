/* =========================
   📱 MOBILE PRODUCTS
========================= */
export const products = [
	{
		id: "iphone15",
		name: "iPhone 15",
		price: 79999,
		oldPrice: 84999,
		imageUrl: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
		category: "mobile",
		stock: 5,
		rating: 4,
		offer: "🔥 Limited Offer",
		description: "Latest Apple smartphone with powerful performance.",
		reviews: [
			{ user: "Rahul", text: "Amazing performance 🔥", stars: 5 },
			{ user: "Meet", text: "Smooth and fast", stars: 4 }
		]
	},
	{
		id: "iphone15pro",
		name: "iPhone 15 Pro",
		price: 134999,
		oldPrice: 139999,
		imageUrl: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
		category: "mobile",
		stock: 5,
		rating: 5,
		offer: "🔥 Best Seller",
		description: "Premium Apple device with A17 Pro chip.",
		reviews: [{ user: "Amit", text: "Super premium feel", stars: 5 }]
	},
	{
		id: "s24",
		name: "Samsung S24 Ultra",
		price: 109999,
		oldPrice: 119999,
		imageUrl: "https://m.media-amazon.com/images/I/71J8tz0UeJL._SL1500_.jpg",
		category: "mobile",
		stock: 5,
		rating: 5,
		offer: "⚡ AI Power Phone",
		description: "Flagship Samsung phone with AI features.",
		reviews: [{ user: "Nirav", text: "Camera is insane", stars: 5 }]
	},
	{
		id: "oneplus13",
		name: "OnePlus 13",
		price: 59999,
		oldPrice: 64999,
		imageUrl: "https://m.media-amazon.com/images/I/61amb0CfMGL._SL1500_.jpg",
		category: "mobile",
		stock: 5,
		rating: 4,
		offer: "⚡ Speed Beast",
		description: "Fast and smooth Android experience.",
		reviews: [{ user: "Jay", text: "Very fast", stars: 4 }]
	}
];

/* =========================
   ⌚ WATCH PRODUCTS
========================= */
export const watches = [
	{
		id: "watch9",
		name: "Apple Watch Series 9",
		price: 24999,
		oldPrice: 27999,
		imageUrl: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series9-1.jpg",
		category: "watch",
		stock: 5,
		rating: 5,
		offer: "⌚ Smart Watch King",
		description: "Best Apple smartwatch experience"
	},
	{
		id: "watch7",
		name: "Samsung Watch 7",
		price: 29999,
		oldPrice: 32999,
		imageUrl: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch7-1.jpg",
		category: "watch",
		stock: 5,
		rating: 4,
		offer: "⚡ Fitness Pro",
		description: "Advanced fitness tracking"
	},
	{
		id: "miwatch",
		name: "Mi Watch",
		price: 12999,
		oldPrice: 14999,
		imageUrl: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-watch-1.jpg",
		category: "watch",
		stock: 5,
		rating: 4,
		offer: "💰 Budget Smart Watch",
		description: "Affordable smart watch"
	},
	{
		id: "onepluswatch2",
		name: "OnePlus Watch 2",
		price: 18999,
		oldPrice: 20999,
		imageUrl: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-watch-2-1.jpg",
		category: "watch",
		stock: 5,
		rating: 4,
		offer: "🔥 Stylish Wearable",
		description: "Premium OnePlus watch"
	}
];

/* =========================
   🎧 ACCESSORIES
========================= */
export const accessories = [
	{
		id: "airpods",
		name: "AirPods Pro",
		price: 24999,
		imageUrl: "https://m.media-amazon.com/images/I/71bhWgQK-cL._SL1500_.jpg",
		category: "accessory",
		stock: 5,
		rating: 5,
		description: "Apple premium wireless earbuds"
	},
	{
		id: "boatbuds",
		name: "Boat Airdopes",
		price: 2999,
		imageUrl: "https://m.media-amazon.com/images/I/61KNJav3S9L._SL1500_.jpg",
		category: "accessory",
		stock: 5,
		rating: 4,
		description: "Budget wireless earbuds"
	}
];

/* =========================
   🔥 MASTER ARRAY (IMPORTANT)
========================= */
export const allProducts = [
	...products,
	...watches,
	...accessories
];