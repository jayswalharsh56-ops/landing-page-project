<script>
	import { onMount } from 'svelte';
	import { allProducts } from '$lib/products';
	import { cart } from '$lib/stores/cart';

	let products = [];
	let search = "";
	let loading = true;

	const heroImages = [
		"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-xl-1.jpg"
	];

	let current = 0;

	onMount(() => {
		products = allProducts;
		loading = false;

		const slider = setInterval(() => {
			current = (current + 1) % heroImages.length;
		}, 3000);

		return () => clearInterval(slider);
	});
</script>


<!-- CATEGORY -->

<section class="categories">

	<div class="category">
		📱
		<span>Mobiles</span>
	</div>

	<div class="category">
		💻
		<span>Laptops</span>
	</div>

	<div class="category">
		⌚
		<span>Watches</span>
	</div>

	<div class="category">
		🎧
		<span>Headphones</span>
	</div>

	<div class="category">
		📷
		<span>Cameras</span>
	</div>

	<div class="category">
		🎮
		<span>Gaming</span>
	</div>

</section>

<!-- PRODUCT SECTION -->

<section class="products">

	<h2>
		Featured Products
	</h2>

	<div class="product-grid">

	{#if loading}

		<p>Loading Products...</p>

	{:else}

		{#each products.filter(p =>
			p.name.toLowerCase().includes(search.toLowerCase())
		) as p}

			<div class="product-card">

				<div class="discount">
					-15%
				</div>

				<div class="wishlist">
					🤍
				</div>

				<a href={`/products/${p.id}`}>

					<img
						src={p.imageUrl}
						alt={p.name}
					>

				</a>

				<div class="rating">

					⭐⭐⭐⭐⭐
					<span>(4.8)</span>

				</div>

				<h3>
					{p.name}
				</h3>

				<div class="price-box">

					<span class="new-price">
						₹{p.price}
					</span>

					<span class="old-price">
						₹{Math.round(p.price * 1.18)}
					</span>

				</div>

				<div class="buttons">

					<button
						class="cart-btn"
						on:click={() => cart.add(p)}
					>
						Add to Cart 🛒
					</button>

					<a
						class="view-btn"
						href={`/products/${p.id}`}
					>
						View Details
					</a>

				</div>

			</div>

		{/each}

	{/if}

</div>

</section>

<!-- BIG SALE -->

<section class="sale-banner">

	<div class="sale-content">

		<div>

			<h2>🔥 Mega Gadget Sale</h2>

			<p>
				Up to <span>50% OFF</span> on Mobiles,
				Smart Watches & Accessories.
			</p>

		</div>

		<a href="/products">
			<button>Shop Now →</button>
		</a>

	</div>

</section>

<!-- WHY CHOOSE US -->

<section class="features">

	<div class="feature-card">
		🚚
		<h3>Free Shipping</h3>
		<p>Free delivery across India.</p>
	</div>

	<div class="feature-card">
		🔒
		<h3>Secure Payment</h3>
		<p>100% safe online payment.</p>
	</div>

	<div class="feature-card">
		↩️
		<h3>Easy Returns</h3>
		<p>7 Days replacement policy.</p>
	</div>

	<div class="feature-card">
		⭐
		<h3>Premium Quality</h3>
		<p>Original branded products.</p>
	</div>

</section>

<!-- TOP BRANDS -->

<section class="brands">

	<h2>Top Brands</h2>

	<div class="brand-grid">

		<div>🍎 Apple</div>
		<div>📱 Samsung</div>
		<div>⚡ OnePlus</div>
		<div>💚 OPPO</div>
		<div>🔵 Vivo</div>
		<div>⭐ Realme</div>
		<div>🟠 Xiaomi</div>
		<div>⚫ Nothing</div>

	</div>

</section>

<!-- NEWSLETTER -->

<section class="newsletter">

	<h2>Stay Updated</h2>

	<p>
		Get latest offers & new arrivals directly in your inbox.
	</p>

	<div class="newsletter-box">

		<input
			type="email"
			placeholder="Enter your email"
		>

		<button>
			Subscribe
		</button>

	</div>

</section>

<style>

:global(body){
	margin:0;
	background:#08111f;
	color:white;
	font-family:system-ui;
}

.hero{
	max-width:1300px;
	margin:auto;
	padding:80px 20px;
	display:flex;
	align-items:center;
	justify-content:space-between;
	gap:60px;
}

.hero-content{
	flex:1;
}

.badge{
	display:inline-block;
	background:#2563eb;
	padding:10px 18px;
	border-radius:40px;
	font-weight:700;
	margin-bottom:20px;
}

.hero h1{
	font-size:60px;
	line-height:1.1;
	font-weight:900;
}

.hero h1 span{
	color:#60a5fa;
}

.hero p{
	font-size:18px;
	opacity:.8;
	max-width:520px;
	margin:25px 0;
}

.search-box{
	display:flex;
	max-width:500px;
	background:white;
	border-radius:50px;
	overflow:hidden;
}

.search-box input{
	flex:1;
	border:none;
	padding:16px;
	outline:none;
	font-size:16px;
}

.search-box button{
	border:none;
	background:#2563eb;
	color:white;
	padding:0 30px;
	font-weight:700;
	cursor:pointer;
}

.hero-image{
	flex:1;
	text-align:center;
}

.hero-image img{
	width:100%;
	max-width:420px;
	object-fit:contain;
	animation:float 4s ease infinite;
}

@keyframes float{

	0%{
		transform:translateY(0);
	}

	50%{
		transform:translateY(-15px);
	}

	100%{
		transform:translateY(0);
	}

}

.categories{
	max-width:1300px;
	margin:auto;
	padding:20px;
	display:flex;
	gap:20px;
	overflow-x:auto;
}

.categories::-webkit-scrollbar{
	display:none;
}

.category{
	min-width:150px;
	background:#111827;
	border-radius:18px;
	padding:20px;
	text-align:center;
	font-size:20px;
	cursor:pointer;
	transition:.3s;
}

.category span{
	display:block;
	margin-top:10px;
	font-size:16px;
	font-weight:700;
}

.category:hover{
	background:#2563eb;
	transform:translateY(-8px);
}

.products{
	max-width:1300px;
	margin:auto;
	padding:60px 20px;
}

.products h2{
	font-size:34px;
	font-weight:900;
}

@media(max-width:900px){

.hero{
	flex-direction:column;
	text-align:center;
}

.hero h1{
	font-size:40px;
}

.search-box{
	margin:auto;
}

}
.product-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:25px;
	margin-top:40px;
}

.product-card{
	background:#111827;
	border-radius:22px;
	padding:20px;
	position:relative;
	transition:.35s;
	border:1px solid rgba(255,255,255,.08);
}

.product-card:hover{
	transform:translateY(-10px);
	box-shadow:0 20px 50px rgba(37,99,235,.35);
}

.product-card img{
	width:100%;
	height:220px;
	object-fit:contain;
}

.discount{
	position:absolute;
	top:15px;
	left:15px;
	background:#ef4444;
	padding:6px 12px;
	border-radius:20px;
	font-size:13px;
	font-weight:700;
}

.wishlist{
	position:absolute;
	top:15px;
	right:15px;
	width:40px;
	height:40px;
	border-radius:50%;
	background:#1f2937;
	display:flex;
	align-items:center;
	justify-content:center;
	cursor:pointer;
	font-size:18px;
}

.rating{
	color:#facc15;
	margin-top:15px;
	font-size:15px;
}

.rating span{
	color:#9ca3af;
	margin-left:5px;
}

.product-card h3{
	font-size:18px;
	margin:12px 0;
	min-height:50px;
}

.price-box{
	display:flex;
	align-items:center;
	gap:12px;
	margin-bottom:18px;
}

.new-price{
	font-size:24px;
	font-weight:800;
	color:#60a5fa;
}

.old-price{
	text-decoration:line-through;
	color:#6b7280;
}

.buttons{
	display:flex;
	flex-direction:column;
	gap:10px;
}

.cart-btn{
	background:#2563eb;
	border:none;
	color:white;
	padding:12px;
	border-radius:12px;
	font-weight:700;
	cursor:pointer;
}

.view-btn{
	text-align:center;
	padding:12px;
	border-radius:12px;
	text-decoration:none;
	border:1px solid #2563eb;
	color:white;
	transition:.3s;
}

.view-btn:hover{
	background:#2563eb;
}

@media(max-width:1100px){

.product-grid{
	grid-template-columns:repeat(2,1fr);
}

}

@media(max-width:650px){

.product-grid{
	grid-template-columns:1fr;
}

}
.featured-section{
	max-width:1300px;
	margin:auto;
	padding:60px 20px;
}

.section-head{
	display:flex;
	justify-content:space-between;
	align-items:center;
	margin-bottom:30px;
}

.section-head h2{
	font-size:34px;
	font-weight:900;
}

.section-head a{
	color:#60a5fa;
	text-decoration:none;
	font-weight:700;
}

.collection-grid{
	display:grid;
	grid-template-columns:repeat(3,1fr);
	gap:25px;
}

.collection-card{
	position:relative;
	overflow:hidden;
	border-radius:24px;
	background:#111827;
	height:300px;
	cursor:pointer;
}

.collection-card img{
	width:100%;
	height:100%;
	object-fit:cover;
	transition:.4s;
}

.collection-card:hover img{
	transform:scale(1.08);
}

.overlay{
	position:absolute;
	left:0;
	right:0;
	bottom:0;
	padding:25px;
	background:linear-gradient(transparent,rgba(0,0,0,.9));
}

.overlay h3{
	margin:0;
	font-size:24px;
}

.overlay p{
	margin-top:8px;
	color:#d1d5db;
}

@media(max-width:900px){

.collection-grid{
	grid-template-columns:1fr;
}

}
/* SALE */

.sale-banner{

	max-width:1300px;
	margin:70px auto;
	padding:45px;

	background:linear-gradient(135deg,#2563eb,#1d4ed8);

	border-radius:25px;

}

.sale-content{

	display:flex;

	align-items:center;

	justify-content:space-between;

	flex-wrap:wrap;

	gap:20px;

}

.sale-content h2{

	font-size:42px;

	margin:0;

}

.sale-content span{

	color:#fde047;

	font-weight:900;

}

.sale-content button{

	padding:15px 30px;

	border:none;

	border-radius:12px;

	background:white;

	color:#2563eb;

	font-weight:800;

	cursor:pointer;

}

/* FEATURES */

.features{

	max-width:1300px;

	margin:80px auto;

	display:grid;

	grid-template-columns:repeat(4,1fr);

	gap:25px;

}

.feature-card{

	background:#111827;

	padding:30px;

	border-radius:22px;

	text-align:center;

	transition:.35s;

}

.feature-card:hover{

	transform:translateY(-10px);

	background:#2563eb;

}

.feature-card h3{

	margin:15px 0 10px;

}

/* BRANDS */

.brands{

	max-width:1300px;

	margin:80px auto;

}

.brands h2{

	font-size:36px;

	margin-bottom:30px;

}

.brand-grid{

	display:grid;

	grid-template-columns:repeat(4,1fr);

	gap:20px;

}

.brand-grid div{

	background:#111827;

	padding:25px;

	text-align:center;

	border-radius:18px;

	font-weight:700;

	cursor:pointer;

	transition:.3s;

}

.brand-grid div:hover{

	background:#2563eb;

	transform:translateY(-8px);

}

/* NEWSLETTER */

.newsletter{

	max-width:900px;

	margin:90px auto;

	text-align:center;

}

.newsletter h2{

	font-size:40px;

}

.newsletter p{

	opacity:.8;

	margin:20px 0;

}

.newsletter-box{

	display:flex;

	background:white;

	border-radius:50px;

	overflow:hidden;

	max-width:600px;

	margin:auto;

}

.newsletter-box input{

	flex:1;

	border:none;

	padding:18px;

	outline:none;

}

.newsletter-box button{

	border:none;

	background:#2563eb;

	color:white;

	padding:0 35px;

	font-weight:700;

	cursor:pointer;

}

/* RESPONSIVE */

@media(max-width:900px){

.features{

	grid-template-columns:repeat(2,1fr);

}

.brand-grid{

	grid-template-columns:repeat(2,1fr);

}

.sale-content{

	text-align:center;

	justify-content:center;

}

.newsletter-box{

	flex-direction:column;

	border-radius:20px;

}

.newsletter-box button{

	padding:16px;

}

}

@media(max-width:600px){

.features{

	grid-template-columns:1fr;

}

.brand-grid{

	grid-template-columns:1fr;

}

.sale-content h2{

	font-size:30px;

}
}
</style>