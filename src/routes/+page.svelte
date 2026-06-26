<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';

	import { cart } from '$lib/cart';



import { collection, getDocs } from 'firebase/firestore';

let products = [];

let search = "";

$: filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
);

	const heroImages = [
		"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v30-1.jpg"

	];

	let current = 0;

	onMount(async () => {
	const snapshot = await getDocs(collection(db, 'products'));

	products = snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));

	const interval = setInterval(() => {
		current = (current + 1) % heroImages.length;
	}, 3000);

	return () => clearInterval(interval);
});
</script>

<!-- HERO -->
<section class="hero">

	<div class="container">

		<div class="row align-items-center gy-5">

			<!-- LEFT -->
			<div class="col-lg-6 order-2 order-lg-1">

				<span class="hero-badge">
					🔥 India's Trusted Gadget Store
				</span>

				<h1 class="hero-title mt-3">
					Discover The Latest
					<span>Smartphones & Gadgets</span>
				</h1>

				<p class="hero-text mt-4">
					Buy premium mobiles, laptops, smart watches and accessories
					at unbeatable prices with fast delivery.
				</p>

				<!-- SEARCH -->

				<div class="search-box mt-4">

					<input
						type="text"
						bind:value={search}
						placeholder="Search iPhone, Samsung, Laptop..."
					>

					<a href="/products" class="search-btn">
						Search
					</a>

				</div>

				<div class="hero-buttons mt-4">

					<a href="/products" class="btn btn-primary btn-lg">
						Shop Now
					</a>

					<a
						href="/products/iphone15"
						class="btn btn-outline-light btn-lg"
					>
						View Product
					</a>

				</div>

			</div>

			<!-- RIGHT -->

			<div class="col-lg-6 order-1 order-lg-2 text-center">

				<div class="hero-image-box">

					<img
						src={heroImages[current]}
						alt="Hero Product"
						class="hero-img"
					>

				</div>

			</div>

		</div>

	</div>

</section>
<section class="container py-5">

	<div class="d-flex justify-content-between align-items-center mb-4">
		<h2 class="fw-bold text-white">Shop By Category</h2>
		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>
	</div>

	<div class="category-grid">

		<a href="/products" class="category-card">
			<div class="category-icon">📱</div>
			<h5>Mobiles</h5>
			<p>Latest Smartphones</p>
		</a>

		<a href="/products" class="category-card">
			<div class="category-icon">💻</div>
			<h5>Laptops</h5>
			<p>Gaming & Business</p>
		</a>

		<a href="/products" class="category-card">
			<div class="category-icon">🎧</div>
			<h5>Accessories</h5>
			<p>Premium Gadgets</p>
		</a>

		<a href="/products" class="category-card">
			<div class="category-icon">⌚</div>
			<h5>Smart Watches</h5>
			<p>Fitness & Style</p>
		</a>

	</div>

</section>
<section class="container py-5">

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="text-white fw-bold">
			Featured Products
		</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="products-slider">

		{#each products as product}

			<div class="product-item">

				<div class="card product-card h-100">

					<img
						src={product.imageUrl}
						alt={product.name}
					/>

					<div class="card-body">

						<h5>{product.name}</h5>

						<p class="price">
							₹{product.price}
						</p>

						<div class="d-grid gap-2">

							
<button class="btn buy-btn" on:click={() => cart.add(product)}>
	Add to Cart
</button>

							<a
								href={`/products/${product.id}`}
								class="btn btn-outline-primary"
							>
								View Details
							</a>

						</div>

					</div>

				</div>

			</div>

		{/each}

	</div>

</section>
<section class="container py-5">

	<h2 class="section-title">Why Shop With Us</h2>

	<div class="trust-grid">

		<div class="trust-card">🚚 <span>Free Shipping</span></div>
		<div class="trust-card">💳 <span>Secure Payment</span></div>
		<div class="trust-card">🔄 <span>Easy Returns</span></div>
		<div class="trust-card">📞 <span>24/7 Support</span></div>

	</div>

</section>
<section class="container py-5">

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="fw-bold text-white">
			Top Brands
		</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="brand-grid">

		<a href="/products" class="brand-card">🍎 Apple</a>

		<a href="/products" class="brand-card">📱 Samsung</a>

		<a href="/products" class="brand-card">⚡ OnePlus</a>

		<a href="/products" class="brand-card">🔶 Xiaomi</a>

		<a href="/products" class="brand-card">💚 OPPO</a>

		<a href="/products" class="brand-card">🔵 Vivo</a>

		<a href="/products" class="brand-card">⭐ Realme</a>

		<a href="/products" class="brand-card">⚪ Nothing</a>

		

	</div>

</section>
<section class="container py-5">

	<h2 class="section-title">Shop Collections</h2>

	<div class="category-grid">

		<a href="/products" class="category-card">
			<div class="cat-icon">📱</div>
			<h5>Mobile Covers</h5>
		</a>

		<a href="/products" class="category-card">
			<div class="cat-icon">🖼</div>
			<h5>Wall Art</h5>
		</a>

		<a href="/products" class="category-card">
			<div class="cat-icon">🏡</div>
			<h5>Home Decor</h5>
		</a>

		<a href="/products" class="category-card">
			<div class="cat-icon">🎁</div>
			<h5>Gifts</h5>
		</a>

	</div>

</section>

<style>
:global(body) {
	margin: 0;
	padding: 0;
	min-height: 100vh;

	background:
		radial-gradient(circle at top left, #2563eb, transparent 40%),
		radial-gradient(circle at bottom right, #7c3aed, transparent 40%),
		linear-gradient(135deg, #0f172a, #020617);

	background-attachment: fixed;
	color: white;
}
	.hero{
	min-height:100vh;
	display:flex;
	align-items:center;
	padding:120px 0 60px;
}

.hero-badge{
	display:inline-block;
	background:#2563eb;
	padding:8px 18px;
	border-radius:50px;
	font-size:14px;
	font-weight:700;
}

.hero-title{
	font-size:60px;
	font-weight:800;
	line-height:1.1;
}

.hero-title span{
	color:#60a5fa;
}

.hero-text{
	font-size:18px;
	color:#d1d5db;
	max-width:520px;
}

.search-box{
	display:flex;
	background:#fff;
	border-radius:50px;
	overflow:hidden;
	margin-top:25px;
	box-shadow:0 10px 30px rgba(0,0,0,.25);
}

.search-box input{
	flex:1;
	border:none;
	padding:16px 20px;
	outline:none;
	font-size:16px;
}

.search-btn{
	background:#2563eb;
	color:#fff;
	text-decoration:none;
	padding:16px 28px;
	font-weight:700;
}

.hero-buttons{
	display:flex;
	gap:15px;
	flex-wrap:wrap;
}

.hero-image-box{
	background:#fff;
	padding:25px;
	border-radius:30px;
	box-shadow:0 20px 50px rgba(0,0,0,.25);
}

.hero-img{
	width:100%;
	max-height:480px;
	object-fit:contain;
	animation:float 4s ease-in-out infinite;
}

@media(max-width:768px){

.hero{
	padding-top:100px;
	text-align:center;
}

.hero-title{
	font-size:38px;
}

.hero-text{
	font-size:16px;
	max-width:100%;
}

.search-box{
	flex-direction:column;
	border-radius:20px;
}

.search-btn{
	text-align:center;
}

.hero-buttons{
	justify-content:center;
}

.hero-image-box{
	margin-bottom:25px;
}

}
.category-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.category-card{
	background:white;
	color:#111827;
	border-radius:20px;
	padding:25px;
	text-align:center;
	text-decoration:none;
	transition:.3s;
	box-shadow:0 10px 25px rgba(0,0,0,.15);
}

.category-card:hover{
	transform:translateY(-8px);
	background:#2563eb;
	color:white;
}

.category-icon{
	font-size:42px;
	margin-bottom:15px;
}

.category-card h5{
	font-weight:700;
	margin-bottom:8px;
}

.category-card p{
	margin:0;
	font-size:14px;
	color:#6b7280;
}

.category-card:hover p{
	color:#fff;
}

@media(max-width:768px){

.category-grid{
	grid-template-columns:repeat(2,1fr);
	gap:15px;
}

.category-card{
	padding:18px;
}

.category-icon{
	font-size:32px;
}

}
.products-slider{

	display:flex;
	gap:20px;

	overflow-x:auto;

	scroll-behavior:smooth;

	padding-bottom:10px;
}

.products-slider::-webkit-scrollbar{
	display:none;
}

.product-item{

	min-width:280px;

	flex:0 0 auto;
}

.price{

	font-size:20px;

	font-weight:700;

	color:#2563eb;
}

@media(max-width:768px){

.product-item{

	min-width:180px;
}

.product-card img{

	height:150px;
	padding:10px;
}

.product-card h5{

	font-size:15px;
}

.price{

	font-size:17px;
}

.buy-btn{

	font-size:14px;
	padding:8px;
}

}
.brand-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.brand-card{
	background:rgba(255,255,255,.08);
	backdrop-filter:blur(15px);
	border:1px solid rgba(255,255,255,.15);

	color:white;
	text-decoration:none;

	padding:22px 10px;

	border-radius:18px;

	font-weight:700;

	font-size:18px;

	text-align:center;

	transition:.35s;

	box-shadow:0 10px 25px rgba(0,0,0,.25);
}

.brand-card:hover{

	transform:translateY(-8px);

	background:linear-gradient(135deg,#2563eb,#7c3aed);

	border-color:transparent;

	color:#fff;

	box-shadow:0 20px 35px rgba(37,99,235,.35);
}

@media(max-width:991px){

.brand-grid{

	grid-template-columns:repeat(4,1fr);
}

}

@media(max-width:768px){

.brand-grid{

	grid-template-columns:repeat(2,1fr);

	gap:15px;
}

.brand-card{

	font-size:16px;

	padding:18px 8px;
}

}
.trust-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
	text-align:center;
}

.trust-card{
	background:rgba(255,255,255,0.06);
	border:1px solid rgba(255,255,255,0.12);
	padding:20px;
	border-radius:16px;
	backdrop-filter:blur(10px);
	font-weight:600;
	transition:0.3s;
}

.trust-card span{
	display:block;
	margin-top:8px;
}

.trust-card:hover{
	transform:translateY(-6px);
	background:#2563eb;
	color:white;
}

@media(max-width:768px){
	.trust-grid{
		grid-template-columns:repeat(2,1fr);
	}
}
.category-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.category-card{
	background:#fff;
	color:#111;
	border-radius:18px;
	padding:25px;
	text-align:center;
	text-decoration:none;
	transition:0.3s;
	box-shadow:0 10px 25px rgba(0,0,0,0.1);
}

.cat-icon{
	font-size:34px;
	margin-bottom:10px;
}

.category-card:hover{
	transform:translateY(-8px);
	background:#2563eb;
	color:white;
}

@media(max-width:768px){
	.category-grid{
		grid-template-columns:repeat(2,1fr);
		gap:15px;
	}
}
</style>