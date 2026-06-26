<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

let products = [];

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

<!-- HERO SECTION -->
<section class="hero d-flex align-items-center text-white">

	<div class="container">
		<div class="row align-items-center">

			<!-- LEFT TEXT -->
			<div class="col-lg-6">

				<h1 class="display-3 fw-bold">
					Next Gen Gadgets Store
				</h1>

				<p class="lead mt-3">
					Premium smartphones, laptops & accessories at best prices.
				</p>

				<div class="mt-4">
					<a href="/products" class="btn btn-primary btn-lg me-2">
						Shop Now
					</a>

					<a href="/products/iphone15" class="btn btn-primary btn-lg me-2">
	View Featured Product
</a>
				</div>

				<!-- SEARCH BOX -->
				<input
					class="form-control mt-4 w-75"
					placeholder="Search products..."
				/>

			</div>

			<!-- RIGHT IMAGE -->
			<div class="col-lg-6 text-center mt-4 mt-lg-0">

				<img
					src={heroImages[current]}
					alt="hero"
					class="hero-img"
				/>

			</div>

		</div>
	</div>

</section>
<section class="container py-5 text-white">
	<h2 class="text-center mb-4">Shop By Category</h2>

	<div class="row text-center g-4">

		<div class="col-md-3">
			<div class="cat-card">📱 Mobiles</div>
		</div>

		<div class="col-md-3">
			<div class="cat-card">💻 Laptops</div>
		</div>

		<div class="col-md-3">
			<div class="cat-card">🎧 Accessories</div>
		</div>

		<div class="col-md-3">
			<div class="cat-card">⌚ Smartwatch</div>
		</div>

	</div>
</section>
<div class="container my-4">
	<div class="offer-banner text-center text-white">
		⚡ Limited Time Offer – Up to 30% OFF on Smartphones ⚡
	</div>
</div>
<section class="container py-5 text-center text-white">
	<h2 class="mb-4">Top Brands</h2>

	<div class="row g-4">

		<div class="col-md-3 brand">Apple</div>
		<div class="col-md-3 brand">Samsung</div>
		<div class="col-md-3 brand">OnePlus</div>
		<div class="col-md-3 brand">Xiaomi</div>

	</div>
</section>
<section class="container py-5">
	<h2 class="text-center fw-bold mb-5 text-white">
		Featured Products
	</h2>

	<div class="row g-4">

		{#each products as product}
			<div class="col-md-4">
				<div class="card product-card">

					<img
						src={product.imageUrl}
						alt={product.name}
					/>

					<div class="card-body text-center">
	<h5>{product.name}</h5>
	<p>₹{product.price}</p>

	<div class="d-grid gap-2">
		<button class="btn buy-btn">
			Add to Cart
		</button>

		<a href="/products" class="btn btn-light btn-lg">
	View Products
</a>
	</div>
</div>
				</div>
			</div>
		{/each}

	</div>
</section>


		<!-- SMART WATCHES -->

<section class="container py-5">
	<h2 class="text-center fw-bold mb-5 text-white">
		Smart Watches
	</h2>

	<div class="row g-4 justify-content-center">

		<!-- WATCH 1 -->
		<div class="col-md-4">
			<div class="card product-card">
				<img
					src="https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series9-1.jpg"
					alt="Apple Watch"
				/>

				<div class="card-body text-center">
					<h5>Apple Watch Series 9</h5>
					<p>₹24,000</p>

					
				</div>
			</div>
		</div>

		<!-- WATCH 2 -->
		<div class="col-md-4">
			<div class="card product-card">
				<img
					src="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch7-1.jpg"
					alt="Samsung Watch"
				/>

				<div class="card-body text-center">
					<h5>Samsung Galaxy Watch 7</h5>
					<p>₹29,999</p>

					
				</div>
			</div>
		</div>

	</div>
</section>



		

<section class="container py-5">
	<div class="row g-4">

		<div class="col-md-3">
			<div class="stats-box">
				<h1>10K+</h1>
				<p>😊 Happy Customers</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="stats-box">
				<h1>500+</h1>
				<p>📱 Products</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="stats-box">
				<h1>4.9★</h1>
				<p>⭐ Rating</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="stats-box">
				<h1>24/7</h1>
				<p>🎧 Support</p>
			</div>
		</div>

	</div>
</section>
<!-- FEATURES -->
<section class="py-5 text-black text-center">

	<div class="container">

		<div class="row g-4">

			<div class="col-md-4">
				<div class="feature">
					🚚 Fast Delivery
				</div>
			</div>

			<div class="col-md-4">
				<div class="feature">
					🛡️ Warranty
				</div>
			</div>

			<div class="col-md-4">
				<div class="feature">
					💳 Secure Payment
				</div>
			</div>

		</div>

	</div>

</section>

<section class="container py-5 text-white">
	<h2 class="text-center mb-5">Customer Reviews</h2>

	<div class="row g-4">

		<div class="col-md-4">
			<div class="stats-box">
				⭐⭐⭐⭐⭐
				<p class="mt-3">Best smartphone store. Fast delivery.</p>
				<h6>- Rahul</h6>
			</div>
		</div>

		<div class="col-md-4">
			<div class="stats-box">
				⭐⭐⭐⭐⭐
				<p class="mt-3">Original products and good support.</p>
				<h6>- Priya</h6>
			</div>
		</div>

		<div class="col-md-4">
			<div class="stats-box">
				⭐⭐⭐⭐⭐
				<p class="mt-3">Amazing deals on latest phones.</p>
				<h6>- Jay</h6>
			</div>
		</div>

	</div>
</section>


<style>
:global(body) {
	margin:0;
	padding:0;
	min-height:100vh;

	background:
		radial-gradient(circle at top left,#2563eb,transparent 40%),
		radial-gradient(circle at bottom right,#7c3aed,transparent 40%),
		linear-gradient(135deg,#0f172a,#020617);

	background-attachment: fixed;
	color:white;
}
.hero{
	min-height:100vh;
	
}
.product-card{
	border: none;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 10px 25px rgba(0,0,0,0.12);
	transition: all 0.3s ease;
	background: #ffffff;

}

.product-card:hover{
	transform: translateY(-10px);
	box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

.product-card img{
	height: 220px;
	width: 100%;
	object-fit: contain;
	padding: 15px;
	background: #f8fafc;
	transition: 0.3s;
}

.product-card:hover img{
	transform: scale(1.05);
}

.product-card h5{
	font-weight: 700;
	margin-top: 10px;
	color: #0f172a;
}

.product-card p{
	color: #2563eb;
	font-weight: 600;
	font-size: 16px;
}

/* BUY BUTTON */
.buy-btn{
	background: linear-gradient(135deg, #2563eb, #1d4ed8);
	color: white;
	font-weight: 600;
	border-radius: 12px;
	padding: 10px;
	border: none;
	transition: 0.3s;
	margin-top: 10px;
}

.buy-btn:hover{
	background: linear-gradient(135deg, #1d4ed8, #0f172a);
	transform: scale(1.05);
	box-shadow: 0 10px 20px rgba(37,99,235,0.4);
}

/* Section heading */
h2{
	letter-spacing: 1px;
}
.hero-img{
	width:100%;
	max-height:450px;
	object-fit:contain;
	background:white;
	padding:15px;
	border-radius:20px;
	box-shadow:0 20px 50px rgba(0,0,0,0.4);
	animation:float 4s ease-in-out infinite;
}

@keyframes float{
	0%,100%{
		transform:translateY(0);
	}
	50%{
		transform:translateY(-15px);
	}
}

.feature{
	background: white;
	padding:25px;
	border-radius:15px;
	backdrop-filter:blur(10px);
	font-weight:bold;
	transition:0.3s;
}

.feature:hover{
	transform:translateY(-8px);
	box-shadow:0 15px 30px rgba(0,0,0,0.3);
}

.form-control{
	border:none;
	border-radius:12px;
	padding:12px;
}

.form-control:focus{
	box-shadow:0 0 15px rgba(37,99,235,0.5);
}

.btn-primary{
	background:#2563eb;
	border:none;
}
.brand {
	background: white;
	color: #0f172a;
	padding: 30px;
	border-radius: 15px;
	font-weight: 700;
	cursor: pointer;
	transition: 0.3s;
}

.brand:hover {
	background: #2563eb;
	color: white;
	transform: translateY(-8px);
}
.btn-primary:hover{
	background:#1d4ed8;
}



@media(max-width:991px){

	.hero{
		padding-top:100px;
		text-align:center;
	}

	.form-control{
		width:100% !important;
	}

	.hero-img{
		margin-top:30px;
	
	}
}
.offer-banner {
	background: linear-gradient(135deg, #ef4444, #f97316);
	padding: 15px;
	border-radius: 12px;
	font-weight: 700;
	letter-spacing: 1px;
	box-shadow: 0 10px 25px rgba(0,0,0,0.3);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%,100% { transform: scale(1); }
	50% { transform: scale(1.02); }
}
.cat-card {
	background: linear-gradient(135deg, #ffffff, #f1f5f9);
	color: #0f172a;
	padding: 30px 20px;
	border-radius: 18px;
	font-weight: 700;
	font-size: 18px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 8px 20px rgba(0,0,0,0.12);
	position: relative;
	overflow: hidden;
}

/* hover effect */
.cat-card:hover {
	transform: translateY(-10px) scale(1.03);
	box-shadow: 0 20px 40px rgba(0,0,0,0.25);
	background: linear-gradient(135deg, #2563eb, #1d4ed8);
	color: white;
}

/* emoji bigger look */
.cat-card {
	font-size: 20px;
}

/* ripple glow effect */
.cat-card::after {
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
	background: rgba(255,255,255,0.2);
	border-radius: 50%;
	transform: translate(-50%, -50%);
	transition: width 0.4s ease, height 0.4s ease;
}

.cat-card:hover::after {
	width: 300px;
	height: 300px;
}
.stats-box{
	position: relative;
	overflow: hidden;

	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(20px);

	padding: 35px 20px;
	border-radius: 24px;

	border: 1px solid rgba(255,255,255,0.12);

	text-align: center;

	box-shadow:
		0 15px 35px rgba(0,0,0,0.25),
		inset 0 1px 1px rgba(255,255,255,0.1);

	transition: all 0.35s ease;
}

/* Glow Line */
.stats-box::before{
	content: "";
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 3px;

	background: linear-gradient(
		90deg,
		transparent,
		#60a5fa,
		#a855f7,
		transparent
	);

	transition: 0.6s;
}

.stats-box:hover::before{
	left: 100%;
}

.stats-box:hover{
	transform: translateY(-12px) scale(1.03);

	border-color: rgba(96,165,250,0.5);

	box-shadow:
		0 25px 50px rgba(37,99,235,0.35),
		0 0 30px rgba(124,58,237,0.25);
}

.stats-box h1{
	font-size: 3.2rem;
	font-weight: 800;
	margin-bottom: 10px;

	background: linear-gradient(
		135deg,
		#60a5fa,
		#a855f7
	);

	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.stats-box p{
	color: #cbd5e1;
	font-size: 1rem;
	letter-spacing: 0.5px;
	margin: 0;
}
</style>