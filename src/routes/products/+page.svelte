<script>
	import { onMount } from 'svelte';
	import { allProducts } from '$lib/products';
    import { cart } from '$lib/stores/cart';

	let products = [];
	let search = "";
	let loading = true;
    let selectedCategory = "all";

	onMount(() => {
		// 👉 Firebase remove kari didhu (because tu local product.js use kare che)
		products = allProducts;
		loading = false;
	});
</script>

<!-- HEADER -->
<section class="header">
	<div class="container">
		<h1>All Products</h1>
		<p>Premium gadgets & smartphones collection</p>

		<div class="search">
			<input bind:value={search} placeholder="Search products..." />
		</div>
	</div>
</section>

<!-- PRODUCTS -->
<section>
	<div class="container">

		{#if loading}
			<p class="loading">Loading products...</p>
		{:else}

			<div class="grid">

				{#each products as p}

					<div class="card">

						<a href={`/products/${p.id}`}>
							<img src={p.imageUrl} alt={p.name} />

							<div class="info">
								<h3>{p.name}</h3>
								<p class="price">₹{p.price}</p>

								<button type="button">
									View Details
								</button>
							</div>
						</a>

						<button class="cart-btn" on:click={() => cart.add(p)}>
							Add to Cart 🛒
						</button>

					</div>

				{/each}

			</div>

		{/if}

	</div>
</section>

<!-- CATEGORY -->
<section class="category-section">
	<div class="container">

		<h2 class="title">Shop By Category</h2>

		<div class="grid-4">
			<div class="cat">📱 Mobiles</div>
			<div class="cat">💻 Laptops</div>
			<div class="cat">🎧 Headphones</div>
			<div class="cat">⌚ Smart Watches</div>
		</div>

	</div>
</section>

<!-- BANNER -->
<section class="banner">
	<div class="container">

		<h2>🔥 Big Sale is Live</h2>
		<p>Up to 40% OFF on Smartphones, Watches & Accessories</p>

		<button>Shop Now</button>

	</div>
</section>

<style>
:global(body){
	background:#0b1220;
	color:white;
	font-family:system-ui;
	margin:0;
}

/* HEADER */
.header{
	padding:60px 20px;
	text-align:center;
}

.header h1{
	font-size:42px;
	font-weight:900;
}

.header p{
	opacity:0.7;
	margin-top:10px;
}

/* SEARCH */
.search{
	margin-top:20px;
}

.search input{
	padding:12px;
	width:300px;
	max-width:90%;
	border-radius:10px;
	border:none;
}

/* GRID */
.grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:22px;
}

/* CARD */
.card{
	background:rgba(255,255,255,0.05);
	border:1px solid rgba(255,255,255,0.1);
	border-radius:18px;
	padding:15px;
	text-decoration:none;
	color:white;
	transition:0.3s;
}

.card:hover{
	transform:translateY(-10px);
	background:rgba(255,255,255,0.08);
}

.card img{
	width:100%;
	height:200px;
	object-fit:contain;
}

/* INFO */
.info h3{
	font-size:16px;
	margin:10px 0 5px;
}

.price{
	color:#60a5fa;
	font-weight:800;
}

button{
	width:100%;
	padding:10px;
	margin-top:10px;
	border:none;
	border-radius:10px;
	background:#2563eb;
	color:white;
	cursor:pointer;
}

.loading{
	text-align:center;
	opacity:0.7;
}

/* CATEGORY */
.grid-4{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:24px;
	margin-top:30px;
}

.cat{
	background:rgba(255,255,255,0.06);
	border:1px solid rgba(255,255,255,0.12);
	backdrop-filter:blur(18px);
	padding:28px 20px;
	border-radius:20px;
	text-align:center;
	font-size:18px;
	font-weight:700;
	cursor:pointer;
	transition:0.35s ease;
}

.cat:hover{
	transform:translateY(-10px);
	border-color:#60a5fa;
	box-shadow:0 25px 60px rgba(37,99,235,0.35);
}

/* BANNER */
.banner{
	background:linear-gradient(135deg,#2563eb,#1e3a8a);
	color:white;
	text-align:center;
	padding:60px 20px;
	margin:60px 0;
	border-radius:20px;
}

.banner h2{
	font-size:32px;
	font-weight:900;
}

.banner button{
	margin-top:20px;
	padding:12px 25px;
	border:none;
	border-radius:10px;
	font-weight:700;
	cursor:pointer;
	background:white;
	color:#2563eb;
}

/* RESPONSIVE */
@media(max-width:900px){
	.grid{grid-template-columns:repeat(2,1fr);}
	.grid-4{grid-template-columns:repeat(2,1fr);}
}

@media(max-width:500px){
	.grid{grid-template-columns:1fr;}
	.grid-4{grid-template-columns:1fr;}
}
</style>