<script>
	import { onMount } from 'svelte';
	import { allProducts } from '$lib/products';
	import { cart } from '$lib/stores/cart';

	let products = [];

	let search = "";

	const heroImages = [
		"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-1.jpg",
		"https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-xl-1.jpg"
	];

	let current = 0;

	onMount(() => {
		products = allProducts;

		const slider = setInterval(() => {
			current = (current + 1) % heroImages.length;
		}, 3000);

		return () => clearInterval(slider);
	});
</script>




<!-- ================= CATEGORIES ================= -->

<section class="categories">

	<div class="cat-card">
		📱
		<span>Mobiles</span>
	</div>

	<div class="cat-card">
		⌚
		<span>Watches</span>
	</div>

	<div class="cat-card">
		🎧
		<span>Headphones</span>
	</div>

	<div class="cat-card">
		💻
		<span>Laptops</span>
	</div>

</section>
<!-- ================= MOBILES ================= -->

<section class="product-section">

	<div class="section-title">

		<h2>📱 Mobiles</h2>

		<a href="/products">
			View All →
		</a>

	</div>

	<div class="product-grid">

		{#each products
			.filter(
				p =>
					p.category === "mobile" &&
					p.name.toLowerCase().includes(search.toLowerCase())
			) as p}

			<div class="product-card">

				<div class="offer">
					{p.offer}
				</div>

				<a href={`/products/${p.id}`}>

					<img
						src={p.imageUrl}
						alt={p.name}
					/>

				</a>

				<div class="rating">

					{"⭐".repeat(p.rating)}
					<span>({p.rating}.0)</span>

				</div>

				<h3>{p.name}</h3>

				<div class="price-box">

					<span class="price">
						₹{p.price}
					</span>

					<span class="old-price">
						₹{p.oldPrice}
					</span>

				</div>

				<div class="btns">

					<button
						class="cart-btn"
						on:click={() => cart.add(p)}
					>
						Add to Cart
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

	</div>

</section>
<!-- ================= SMART WATCHES ================= -->

<section class="product-section">

	<div class="section-title">

		<h2>⌚ Smart Watches</h2>

		<a href="/products">
			View All →
		</a>

	</div>

	<div class="product-grid">

		{#each products
			.filter(
				p =>
					p.category === "watch" &&
					p.name.toLowerCase().includes(search.toLowerCase())
			) as p}

			<div class="product-card">

				<div class="offer">
					{p.offer}
				</div>

				<a href={`/products/${p.id}`}>

					<img
						src={p.imageUrl}
						alt={p.name}
					/>

				</a>

				<div class="rating">

					{"⭐".repeat(p.rating)}
					<span>({p.rating}.0)</span>

				</div>

				<h3>{p.name}</h3>

				<div class="price-box">

					<span class="price">
						₹{p.price}
					</span>

					<span class="old-price">
						₹{p.oldPrice}
					</span>

				</div>

				<div class="btns">

					<button
						class="cart-btn"
						on:click={() => cart.add(p)}
					>
						Add to Cart
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

	</div>

</section>

<!-- ================= HEADPHONES ================= -->

<section class="product-section">

	<div class="section-title">

		<h2>🎧 Headphones</h2>

		<a href="/products">
			View All →
		</a>

	</div>

	<div class="product-grid">

		{#each products
			.filter(
				p =>
					p.category === "accessory" &&
					p.name.toLowerCase().includes(search.toLowerCase())
			) as p}

			<div class="product-card">

				<a href={`/products/${p.id}`}>

					<img
						src={p.imageUrl}
						alt={p.name}
					/>

				</a>

				<div class="rating">

					{"⭐".repeat(p.rating)}
					<span>({p.rating}.0)</span>

				</div>

				<h3>{p.name}</h3>

				<div class="price-box">

					<span class="price">
						₹{p.price}
					</span>

				</div>

				<div class="btns">

					<button
						class="cart-btn"
						on:click={() => cart.add(p)}
					>
						Add to Cart
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

	</div>

</section>
<!-- ================= LAPTOPS ================= -->

<section class="product-section">

	<div class="section-title">
		<h2>💻 Laptops</h2>
		<a href="/products">View All →</a>
	</div>

	<div class="product-grid">

		{#each products
			.filter(
				p =>
					p.category === "laptop" &&
					p.name.toLowerCase().includes(search.toLowerCase())
			) as p}

			<div class="product-card">

				<div class="offer">
					{p.offer}
				</div>

				<a href={`/products/${p.id}`}>
					<img src={p.imageUrl} alt={p.name} />
				</a>

				<div class="rating">
					{"⭐".repeat(p.rating)}
					<span>({p.rating}.0)</span>
				</div>

				<h3>{p.name}</h3>

				<div class="price-box">
					<span class="price">₹{p.price}</span>
					<span class="old-price">₹{p.oldPrice}</span>
				</div>

				<div class="btns">
					<button
						class="cart-btn"
						on:click={() => cart.add(p)}
					>
						Add to Cart
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

	</div>

</section>
<!-- ================= SALE BANNER ================= -->

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

<!-- ================= WHY CHOOSE US ================= -->

<section class="why-us">

	<h2>Why Shop With Us?</h2>

	<div class="why-grid">

		<div class="why-card">
			🚚
			<h3>Free Shipping</h3>
			<p>Fast & Free delivery all over India.</p>
		</div>

		<div class="why-card">
			🔒
			<h3>Secure Payment</h3>
			<p>100% Safe & Trusted Payments.</p>
		</div>

		<div class="why-card">
			↩️
			<h3>Easy Returns</h3>
			<p>7 Days Easy Replacement Policy.</p>
		</div>

		<div class="why-card">
			⭐
			<h3>Premium Products</h3>
			<p>Only Genuine Branded Products.</p>
		</div>

	</div>

</section>

<!-- ================= TOP BRANDS ================= -->

<section class="brands">

	<h2>Top Brands</h2>

	<div class="brand-grid">

		<div>🍎 Apple</div>
		<div>📱 Samsung</div>
		<div>⚡ OnePlus</div>
		<div>🟢 Xiaomi</div>
		<div>🎧 Sony</div>
		<div>🔥 ASUS</div>
		<div>💻 HP</div>
		<div>🖥 Lenovo</div>

	</div>

</section>

<!-- ================= NEWSLETTER ================= -->

<section class="newsletter">

	<h2>Stay Updated</h2>

	<p>Get latest offers & new arrivals directly in your inbox.</p>

	<div class="newsletter-box">

		<input
			type="email"
			placeholder="Enter your email..."
		/>

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
	font-family:system-ui,sans-serif;
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

.hero-left{
	flex:1;
}

.hero-right{
	flex:1;
	display:flex;
	justify-content:center;
}

.hero-right img{
	width:100%;
	max-width:420px;
	object-fit:contain;
	animation:float 4s ease-in-out infinite;
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

.badge{
	display:inline-block;
	padding:10px 18px;
	background:#2563eb;
	border-radius:50px;
	font-weight:700;
	margin-bottom:20px;
}

.hero h1{
	font-size:60px;
	font-weight:900;
	line-height:1.1;
	margin:0;
}

.hero h1 span{
	color:#60a5fa;
}

.hero p{
	margin:25px 0;
	font-size:18px;
	color:#cbd5e1;
	max-width:500px;
	line-height:1.6;
}

.search-box{
	display:flex;
	background:white;
	border-radius:50px;
	overflow:hidden;
	max-width:500px;
}

.search-box input{
	flex:1;
	border:none;
	outline:none;
	padding:16px;
	font-size:16px;
}

.search-box button{
	border:none;
	background:#2563eb;
	color:white;
	padding:0 30px;
	cursor:pointer;
	font-weight:700;
}

.categories{
	max-width:1300px;
	margin:20px auto 60px;
	padding:0 20px;
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.cat-card{
	background:#111827;
	border-radius:20px;
	padding:25px;
	text-align:center;
	font-size:28px;
	cursor:pointer;
	transition:.3s;
	border:1px solid rgba(255,255,255,.08);
}

.cat-card span{
	display:block;
	margin-top:10px;
	font-size:17px;
	font-weight:700;
}

.cat-card:hover{
	background:#2563eb;
	transform:translateY(-8px);
	box-shadow:0 20px 40px rgba(37,99,235,.35);
}

@media(max-width:900px){

.hero{
	flex-direction:column;
	text-align:center;
}

.hero h1{
	font-size:42px;
}

.search-box{
	margin:auto;
}

.categories{
	grid-template-columns:repeat(2,1fr);
}

}

@media(max-width:600px){

.categories{
	grid-template-columns:1fr 1fr;
}

.hero-right img{
	max-width:280px;
}

}
/* ================= MOBILE SECTION ================= */

.product-section{
	max-width:1300px;
	margin:70px auto;
	padding:0 20px;
}

.section-title{
	display:flex;
	align-items:center;
	justify-content:space-between;
	margin-bottom:25px;
}

.section-title h2{
	font-size:34px;
	font-weight:900;
	margin:0;
}

.section-title a{
	color:#60a5fa;
	text-decoration:none;
	font-weight:700;
}

.product-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:24px;
}

.product-card{
	background:#111827;
	border-radius:22px;
	padding:20px;
	border:1px solid rgba(255,255,255,.08);
	position:relative;
	transition:.3s;
}

.product-card:hover{
	transform:translateY(-8px);
	box-shadow:0 20px 45px rgba(37,99,235,.25);
}

.offer{
	position:absolute;
	top:15px;
	left:15px;
	background:#2563eb;
	padding:6px 12px;
	border-radius:20px;
	font-size:12px;
	font-weight:700;
}

.product-card img{
	width:100%;
	height:220px;
	object-fit:contain;
	margin-top:20px;
}

.rating{
	color:#facc15;
	margin-top:10px;
}

.rating span{
	color:#94a3b8;
	margin-left:5px;
}

.product-card h3{
	margin:12px 0;
	min-height:48px;
}

.price-box{
	display:flex;
	gap:10px;
	align-items:center;
	margin-bottom:18px;
}

.price{
	font-size:22px;
	font-weight:800;
	color:#60a5fa;
}

.old-price{
	text-decoration:line-through;
	color:#6b7280;
}

.btns{
	display:flex;
	flex-direction:column;
	gap:10px;
}

.cart-btn,
.view-btn{
	padding:12px;
	border:none;
	border-radius:10px;
	text-align:center;
	text-decoration:none;
	font-weight:700;
	cursor:pointer;
}

.cart-btn{
	background:#2563eb;
	color:#fff;
}

.view-btn{
	background:#1f2937;
	color:#fff;
}

.view-btn:hover{
	background:#2563eb;
}

@media(max-width:1000px){
	.product-grid{
		grid-template-columns:repeat(2,1fr);
	}
}

@media(max-width:600px){
	.product-grid{
		grid-template-columns:1fr;
	}
}
/* ================= SALE BANNER ================= */

.sale-banner{
	max-width:1300px;
	margin:80px auto;
	padding:45px;
	background:linear-gradient(135deg,#2563eb,#1d4ed8);
	border-radius:24px;
}

.sale-content{
	display:flex;
	align-items:center;
	justify-content:space-between;
	gap:20px;
	flex-wrap:wrap;
}

.sale-content h2{
	font-size:40px;
	margin:0;
}

.sale-content p{
	margin-top:10px;
	font-size:18px;
	color:white;
}

.sale-btn{
	background:white;
	color:#2563eb;
	text-decoration:none;
	padding:15px 28px;
	border-radius:12px;
	font-weight:800;
	transition:.3s;
}

.sale-btn:hover{
	transform:translateY(-4px);
}

@media(max-width:768px){

.sale-content{
	text-align:center;
	justify-content:center;
}

.sale-content h2{
	font-size:30px;
}

}
/* ================= WHY US ================= */

.why-us{
	max-width:1300px;
	margin:80px auto;
	padding:0 20px;
}

.why-us h2{
	font-size:36px;
	margin-bottom:30px;
}

.why-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.why-card{
	background:#111827;
	padding:30px;
	border-radius:20px;
	text-align:center;
	border:1px solid rgba(255,255,255,.08);
	transition:.3s;
}

.why-card:hover{
	transform:translateY(-8px);
	background:#2563eb;
}

/* ================= BRANDS ================= */

.brands{
	max-width:1300px;
	margin:80px auto;
	padding:0 20px;
}

.brands h2{
	font-size:36px;
	margin-bottom:25px;
}

.brand-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.brand-grid div{
	background:#111827;
	padding:22px;
	border-radius:18px;
	text-align:center;
	font-weight:700;
	transition:.3s;
}

.brand-grid div:hover{
	background:#2563eb;
	transform:translateY(-6px);
}

/* ================= NEWSLETTER ================= */

.newsletter{
	max-width:900px;
	margin:90px auto;
	text-align:center;
	padding:0 20px;
}

.newsletter h2{
	font-size:40px;
}

.newsletter p{
	color:#cbd5e1;
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
	padding:16px;
	border:none;
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

/* ================= RESPONSIVE ================= */

@media(max-width:900px){

	.why-grid{
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
		padding:16px;
	}
}

@media(max-width:600px){

	.why-grid{
		grid-template-columns:1fr;
	}

	.brand-grid{
		grid-template-columns:1fr;
	}
}
</style>