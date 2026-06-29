<script>
	import { onMount } from 'svelte';
	import {
		products as mobiles,
		watches,
		accessories,
		laptops
	} from '$lib/products';

	import { cart } from '$lib/stores/cart';

	let search = "";

	const heroImages = [
		"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/vivo/vivo-v30-1.jpg"
	];

	let current = 0;

	onMount(() => {
		const slider = setInterval(() => {
			current = (current + 1) % heroImages.length;
		}, 3000);

		return () => clearInterval(slider);
	});
</script>
<section class="hero">

	<div class="container">

		<div class="row align-items-center gy-5">

			<div class="col-lg-6">

				<span class="hero-badge">
					🔥 India's Trusted Gadget Store
				</span>

				<h1 class="hero-title">
					Discover The Latest
					<span>Smartphones & Gadgets</span>
				</h1>

				<p class="hero-text">
					Buy Premium Mobiles, Laptops,
					Smart Watches & Accessories
					at the Best Price.
				</p>

				<div class="search-box">

					<input
						bind:value={search}
						type="text"
						placeholder="Search Products..."
					>

					<a
						href="/products"
						class="search-btn"
					>
						Search
					</a>

				</div>

				<div class="hero-buttons mt-4">

					<a
						href="/products"
						class="btn btn-primary btn-lg"
					>
						Shop Now
					</a>

				</div>

			</div>

			<div class="col-lg-6 text-center">

				<div class="hero-image-box">

					<img
						src={heroImages[current]}
						alt="Hero"
						class="hero-img"
					>

				</div>

			</div>

		</div>

	</div>

</section>
<section class="container py-5">

	<h2 class="section-title">
		Shop By Category
	</h2>

	<div class="category-grid">

		<a href="/products" class="category-card">
			<img
				src="https://cdn-icons-png.flaticon.com/512/15/15874.png"
				alt="Mobiles"
			>
			<h5>Mobiles</h5>
		</a>

		<a href="/products" class="category-card">
			<img
				src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
				alt="Smart Watches"
			>
			<h5>Smart Watches</h5>
		</a>

		<a href="/products" class="category-card">
			<img
				src="https://cdn-icons-png.flaticon.com/512/3659/3659898.png"
				alt="Headphones"
			>
			<h5>Headphones</h5>
		</a>

		<a href="/products" class="category-card">
			<img
				src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
				alt="Laptops"
			>
			<h5>Laptops</h5>
		</a>

	</div>

</section>
<section class="container py-5">

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="text-white fw-bold">📱 Mobiles</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="products-slider">

		{#each mobiles.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) as product}

			<div class="product-item">

				<div class="card product-card h-100">

					<img src={product.imageUrl} alt={product.name}>

					<div class="card-body">

						<h5>{product.name}</h5>

						<p class="price">₹{product.price}</p>

						<div class="d-grid gap-2">

							<button
								class="btn buy-btn"
								on:click={() => cart.add(product)}
							>
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

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="text-white fw-bold">⌚ Smart Watches</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="products-slider">

		{#each watches.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) as product}

			<div class="product-item">

				<div class="card product-card h-100">

					<img src={product.imageUrl} alt={product.name}>

					<div class="card-body">

						<h5>{product.name}</h5>

						<p class="price">₹{product.price}</p>

						<div class="d-grid gap-2">

							<button
								class="btn buy-btn"
								on:click={() => cart.add(product)}
							>
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

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="text-white fw-bold">🎧 Headphones</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="products-slider">

		{#each accessories.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) as product}

			<div class="product-item">

				<div class="card product-card h-100">

					<img src={product.imageUrl} alt={product.name}>

					<div class="card-body">

						<h5>{product.name}</h5>

						<p class="price">₹{product.price}</p>

						<div class="d-grid gap-2">

							<button
								class="btn buy-btn"
								on:click={() => cart.add(product)}
							>
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

	<div class="d-flex justify-content-between align-items-center mb-4">

		<h2 class="text-white fw-bold">💻 Laptops</h2>

		<a href="/products" class="text-info text-decoration-none">
			View All →
		</a>

	</div>

	<div class="products-slider">

		{#each laptops.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) as product}

			<div class="product-item">

				<div class="card product-card h-100">

					<img src={product.imageUrl} alt={product.name}>

					<div class="card-body">

						<h5>{product.name}</h5>

						<p class="price">₹{product.price}</p>

						<div class="d-grid gap-2">

							<button
								class="btn buy-btn"
								on:click={() => cart.add(product)}
							>
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
<section class="sale-banner">

	<div class="sale-content">

		<div>

			<h2>🔥 Mega Gadget Sale</h2>

			<p>
				Up to <strong>50% OFF</strong> on Mobiles,
				Smart Watches, Headphones & Laptops.
			</p>

		</div>

		<a href="/products" class="sale-btn">
			Shop Now →
		</a>

	</div>

</section>
<section class="container py-5">

	<h2 class="text-center fw-bold mb-5 text-white">
		Why Choose Galaxy Store?
	</h2>

	<div class="feature-grid">

		<div class="feature-card">
			🚚
			<h4>Free Delivery</h4>
			<p>Fast delivery across India.</p>
		</div>

		<div class="feature-card">
			🔒
			<h4>100% Secure Payment</h4>
			<p>Safe & trusted payment methods.</p>
		</div>

		<div class="feature-card">
			💯
			<h4>Original Products</h4>
			<p>Only genuine branded gadgets.</p>
		</div>

		<div class="feature-card">
			📞
			<h4>24×7 Support</h4>
			<p>Always here to help you.</p>
		</div>

	</div>

</section>
<section class="container py-5">

	<h2 class="text-center fw-bold mb-5 text-white">
		Top Brands
	</h2>

	<div class="brand-grid">

		<div class="brand-box">🍎 Apple</div>
		<div class="brand-box">📱 Samsung</div>
		<div class="brand-box">⚡ OnePlus</div>
		<div class="brand-box">💚 OPPO</div>
		<div class="brand-box">🔵 Vivo</div>
		<div class="brand-box">⭐ Realme</div>
		<div class="brand-box">🟠 Xiaomi</div>
		<div class="brand-box">⚪ Nothing</div>

	</div>

</section>
<section class="newsletter">

	<h2>Get Latest Offers</h2>

	<p>Subscribe and receive exclusive deals & discounts.</p>

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
	font-family:system-ui;
	background:#0b1220;
	color:#fff;
}

.container{
	max-width:1200px;
	margin:auto;
}

section{
	padding:80px 20px;
}

/* HERO */

.hero{
	min-height:100vh;
	display:flex;
	align-items:center;
}

.hero-badge{
	display:inline-block;
	background:#2563eb;
	padding:8px 18px;
	border-radius:50px;
	font-weight:700;
}

.hero-title{
	font-size:60px;
	font-weight:800;
	line-height:1.1;
	margin:20px 0;
}

.hero-title span{
	color:#60a5fa;
}

.hero-text{
	color:#d1d5db;
	font-size:18px;
	max-width:520px;
}

.search-box{
	display:flex;
	background:#fff;
	border-radius:50px;
	overflow:hidden;
	margin-top:25px;
}

.search-box input{
	flex:1;
	border:none;
	outline:none;
	padding:15px 20px;
	font-size:16px;
}

.search-btn{
	background:#2563eb;
	color:#fff;
	text-decoration:none;
	padding:15px 28px;
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
	border-radius:25px;
}

.hero-img{
	width:100%;
	max-height:450px;
	object-fit:contain;
}

/* CATEGORY */

.section-title{
	font-size:36px;
	font-weight:800;
	text-align:center;
	margin-bottom:45px;
}

.category-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:25px;
}

.category-card{
	background:#fff;
	border-radius:25px;
	padding:30px;
	text-align:center;
	text-decoration:none;
	color:#111;
	transition:.35s;
	box-shadow:0 15px 35px rgba(0,0,0,.15);
}

.category-card img{
	width:90px;
	height:90px;
	object-fit:contain;
	margin-bottom:20px;
}

.category-card h5{
	font-size:20px;
	font-weight:700;
}

.category-card:hover{
	transform:translateY(-10px);
	background:#2563eb;
	color:#fff;
}

@media(max-width:768px){

.category-grid{
	grid-template-columns:repeat(2,1fr);
	gap:18px;
}

.category-card{
	padding:20px;
}

.category-card img{
	width:65px;
	height:65px;
}

.section-title{
	font-size:28px;
}

}

/* PRODUCTS */

.products-slider{
	display:flex;
	gap:20px;
	overflow-x:auto;
	scroll-behavior:smooth;
	padding-bottom:10px;
	-webkit-overflow-scrolling:touch;
}

.products-slider::-webkit-scrollbar{
	display:none;
}

.product-item{
	flex:0 0 auto;
	width:280px;
}

.product-card{
	border:none;
	border-radius:18px;
	overflow:hidden;
}

.product-card img{
	width:100%;
	height:220px;
	object-fit:contain;
	padding:20px;
	background:#fff;
}

.price{
	color:#2563eb;
	font-size:22px;
	font-weight:700;
}

.buy-btn{
	background:#2563eb;
	color:#fff;
	border:none;
}

/* SALE */

.sale-banner{
	background:linear-gradient(135deg,#2563eb,#7c3aed);
	border-radius:25px;
	margin:70px auto;
	max-width:1200px;
	padding:50px 30px;
}

.sale-content{
	display:flex;
	align-items:center;
	justify-content:space-between;
	gap:30px;
}

.sale-btn{
	background:#fff;
	color:#111;
	padding:14px 28px;
	border-radius:50px;
	text-decoration:none;
	font-weight:700;
}

/* MOBILE */

@media(max-width:768px){

.hero{
	text-align:center;
	padding-top:90px;
}

.hero-title{
	font-size:38px;
}

.hero-buttons{
	justify-content:center;
}

.search-box{
	flex-direction:column;
	border-radius:20px;
}

.search-btn{
	text-align:center;
}

.category-grid{
	grid-template-columns:repeat(2,1fr);
	gap:15px;
}

.product-item{
	width:180px;
}

.product-card img{
	height:150px;
	padding:10px;
}

.product-card h5{
	font-size:15px;
}

.price{
	font-size:18px;
}

.sale-content{
	flex-direction:column;
	text-align:center;
}

.sale-btn{
	width:100%;
	text-align:center;
}

}
.feature-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.feature-card{
	background:#fff;
	color:#111;
	padding:30px;
	border-radius:20px;
	text-align:center;
	transition:.3s;
}

.feature-card:hover{
	transform:translateY(-8px);
}

.brand-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.brand-box{
	background:#fff;
	color:#111;
	padding:25px;
	border-radius:18px;
	text-align:center;
	font-weight:bold;
}

.newsletter{
	text-align:center;
	padding:80px 20px;
}

.newsletter-box{
	max-width:600px;
	margin:auto;
	display:flex;
	background:#fff;
	border-radius:50px;
	overflow:hidden;
}

.newsletter-box input{
	flex:1;
	padding:16px;
	border:none;
	outline:none;
}

.newsletter-box button{
	background:#2563eb;
	color:white;
	border:none;
	padding:16px 30px;
}

@media(max-width:768px){

.feature-grid{
	grid-template-columns:repeat(2,1fr);
}

.brand-grid{
	grid-template-columns:repeat(2,1fr);
}

.newsletter-box{
	flex-direction:column;
	border-radius:20px;
}

.newsletter-box button{
	width:100%;
}

}
</style>