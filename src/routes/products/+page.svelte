<script>
	import { allProducts } from '$lib/products';
	import { cart } from '$lib/stores/cart';

	let search = "";
	let selectedCategory = "all";

	const categories = [
		{ id: "all", name: "All Products", icon: "🛍️" },
		{ id: "mobile", name: "Mobiles", icon: "📱" },
		{ id: "watch", name: "Smart Watches", icon: "⌚" },
		{ id: "accessory", name: "Headphones", icon: "🎧" },
		{ id: "laptop", name: "Laptops", icon: "💻" }
	];

	$: filteredProducts = allProducts.filter((p) => {
		const matchCategory =
			selectedCategory === "all" || p.category === selectedCategory;

		const matchSearch = p.name
			.toLowerCase()
			.includes(search.toLowerCase());

		return matchCategory && matchSearch;
	});
</script>
<!-- ================= HEADER ================= -->

<section class="page-header">
	<h1>🛍️ Our Products</h1>
	<p>Find your favourite gadgets at the best prices.</p>
</section>

<!-- ================= SEARCH ================= -->

<section class="search-bar">
	<input
		type="text"
		bind:value={search}
		placeholder="🔍 Search products..."
	/>
</section>

<!-- ================= MAIN LAYOUT ================= -->

<div class="shop-layout">

	<!-- Sidebar -->

	<aside class="sidebar">

		<h3>Categories</h3>

		{#each categories as c}

			<button
				class:selected={selectedCategory === c.id}
				on:click={() => selectedCategory = c.id}
			>
				{c.icon} {c.name}
			</button>

		{/each}

	</aside>

	<!-- Products -->

	<section class="products-area">

		<div class="products-grid">

			{#each filteredProducts as p}

				<div class="product-card">

					{#if p.offer}
						<div class="offer">{p.offer}</div>
					{/if}

					<a href={`/products/${p.id}`}>
						<img src={p.imageUrl} alt={p.name} />
					</a>

					<div class="rating">
						{"⭐".repeat(p.rating || 4)}
					</div>

					<h3>{p.name}</h3>

					<div class="price-box">

						<span class="price">
							₹{p.price}
						</span>

						{#if p.oldPrice}
							<span class="old-price">
								₹{p.oldPrice}
							</span>
						{/if}

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

</div>
<style>
    :global(body){
	margin:0;
	font-family:system-ui,sans-serif;
	background:#08111f;
	color:white;
}

.page-header{
	max-width:1400px;
	margin:40px auto 20px;
	padding:0 20px;
}

.page-header h1{
	font-size:42px;
	margin:0;
	font-weight:900;
}

.page-header p{
	color:#94a3b8;
	margin-top:10px;
}

.search-bar{
	max-width:1400px;
	margin:25px auto;
	padding:0 20px;
}

.search-bar input{
	width:100%;
	padding:16px 20px;
	border:none;
	border-radius:14px;
	background:#111827;
	color:white;
	font-size:16px;
	outline:none;
	border:1px solid rgba(255,255,255,.08);
}
.sidebar button.selected{
	background:#2563eb;
	color:white;
}
.shop-layout{
	max-width:1400px;
	margin:35px auto 60px;
	padding:0 20px;
	display:grid;
	grid-template-columns:260px 1fr;
	gap:30px;
}

/* Sidebar */

.sidebar{
	background:#111827;
	padding:25px;
	border-radius:20px;
	height:max-content;
	position:sticky;
	top:20px;
	border:1px solid rgba(255,255,255,.08);
}

.sidebar h3{
	margin-top:0;
	margin-bottom:20px;
	font-size:22px;
}

.sidebar button{
	width:100%;
	border:none;
	background:#1f2937;
	color:white;
	padding:14px;
	margin-bottom:12px;
	border-radius:12px;
	text-align:left;
	cursor:pointer;
	font-size:15px;
	font-weight:700;
	transition:.3s;
}

.sidebar button:hover{
	background:#2563eb;
}

.sidebar button.selected{
	background:#2563eb;
}

/* Products */

.products-grid{
	display:grid;
	grid-template-columns:repeat(3,1fr);
	gap:25px;
}

.product-card{
	background:#111827;
	border-radius:20px;
	padding:18px;
	position:relative;
	border:1px solid rgba(255,255,255,.08);
	transition:.35s;
}

.product-card:hover{
	transform:translateY(-8px);
	box-shadow:0 20px 45px rgba(37,99,235,.25);
}

.offer{
	position:absolute;
	left:15px;
	top:15px;
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
	margin-top:12px;
	font-size:18px;
}

.product-card h3{
	margin:15px 0;
	min-height:50px;
	font-size:20px;
}

.price-box{
	display:flex;
	align-items:center;
	gap:10px;
	margin-bottom:18px;
}

.price{
	color:#60a5fa;
	font-size:24px;
	font-weight:800;
}

.old-price{
	color:#6b7280;
	text-decoration:line-through;
}

.btns{
	display:flex;
	flex-direction:column;
	gap:12px;
}

.cart-btn{
	background:#2563eb;
	color:white;
	border:none;
	padding:13px;
	border-radius:10px;
	cursor:pointer;
	font-weight:700;
}

.cart-btn:hover{
	background:#1d4ed8;
}

.view-btn{
	background:#1f2937;
	color:white;
	text-decoration:none;
	text-align:center;
	padding:13px;
	border-radius:10px;
	font-weight:700;
}

.view-btn:hover{
	background:#374151;
}

/* Tablet */

@media(max-width:1000px){

	.shop-layout{
		grid-template-columns:1fr;
	}

	.sidebar{
		position:static;
	}

	.products-grid{
		grid-template-columns:repeat(2,1fr);
	}

}

/* Mobile */

@media(max-width:600px){

	.page-header h1{
		font-size:30px;
	}

	.products-grid{
		grid-template-columns:1fr;
	}

	.sidebar button{
		font-size:14px;
		padding:12px;
	}

	.product-card img{
		height:180px;
	}

}
</style>