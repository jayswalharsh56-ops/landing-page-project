<script>
	import { page } from '$app/stores';
	import { allProducts } from '$lib/products';
	import { cart } from '$lib/stores/cart';
	import { goto } from '$app/navigation';

	let product;

	$: {
		const id = $page.params.id;
		product = allProducts.find(p => p.id === id);
	}
</script>

{#if !product}
	<p style="text-align:center; padding:50px;">Product not found</p>
{:else}


<section class="details">
	<div class="container">

		<div class="grid">

			<!-- IMAGE -->
			<div class="img-box">
				<img src={product.imageUrl} alt={product.name} />
			</div>

			<!-- INFO -->
			<div class="info">
				<h1>{product.name}</h1>

				<p class="price">₹{product.price}</p>

				{#if product.oldPrice}
					<p class="old">₹{product.oldPrice}</p>
				{/if}

				<p class="desc">{product.description}</p>

				{#if product.offer}
					<div class="badge">{product.offer}</div>
				{/if}
				<button class="back" on:click={() => window.history.back()}>
	← Back
</button>

				<button class="add" on:click={() => cart.add(product)}>
					Add to Cart 🛒
				</button>
			</div>

		</div>

	</div>
</section>

{/if}

<style>
.details {
	padding: 60px 20px;
	color: white;
	background: #0b1220;
	min-height: 100vh;
}

/* container */
.container {
	max-width: 1100px;
	margin: auto;
}

/* layout */
.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 50px;
	align-items: center;
}

/* image card */
.img-box {
	background: rgba(255,255,255,0.05);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 25px;
	padding: 30px;
	backdrop-filter: blur(15px);
	box-shadow: 0 20px 60px rgba(0,0,0,0.4);
	transition: 0.3s;
}

.img-box:hover {
	transform: scale(1.02);
}

.img-box img {
	width: 100%;
	max-height: 420px;
	object-fit: contain;
}

/* info box */
.info {
	padding: 20px;
}

.info h1 {
	font-size: 38px;
	font-weight: 900;
	letter-spacing: 1px;
}

/* PRICE STYLE (Telinchi vibe) */
.price {
	font-size: 34px;
	font-weight: 900;
	color: #60a5fa;
	margin-top: 10px;
}

.old {
	text-decoration: line-through;
	opacity: 0.5;
	margin-left: 10px;
	font-size: 18px;
}

/* description */
.desc {
	margin-top: 18px;
	line-height: 1.6;
	opacity: 0.85;
	font-size: 15px;
}

/* OFFER BADGE */
.badge {
	display: inline-block;
	margin-top: 15px;
	padding: 6px 14px;
	border-radius: 999px;
	background: linear-gradient(135deg, #2563eb, #60a5fa);
	font-size: 13px;
	font-weight: 700;
	box-shadow: 0 10px 25px rgba(37,99,235,0.3);
}

/* ⭐ RATING STYLE */
.rating {
	margin-top: 15px;
	font-size: 18px;
	color: gold;
	letter-spacing: 2px;
}

/* ADD TO CART BUTTON */
.add {
	margin-top: 25px;
	padding: 14px 22px;
	border: none;
	border-radius: 12px;
	background: linear-gradient(135deg, #2563eb, #1e3a8a);
	color: white;
	font-weight: 700;
	cursor: pointer;
	transition: 0.3s;
	width: 100%;
}

.add:hover {
	transform: translateY(-3px);
	box-shadow: 0 15px 30px rgba(37,99,235,0.4);
}

/* SMALL INFO BOXES (spec style) */
.specs {
	display: flex;
	gap: 10px;
	margin-top: 20px;
	flex-wrap: wrap;
}

.spec {
	background: rgba(255,255,255,0.06);
	border: 1px solid rgba(255,255,255,0.1);
	padding: 8px 12px;
	border-radius: 10px;
	font-size: 13px;
}

/* RESPONSIVE */
@media(max-width:900px) {
	.grid {
		grid-template-columns: 1fr;
		text-align: center;
	}

	.info h1 {
		font-size: 30px;
	}
}
.back {
	position: sticky;
	top: 20px;
	margin: 20px;
	padding: 10px 16px;
	border: none;
	border-radius: 10px;
	background: rgba(255,255,255,0.08);
	color: white;
	cursor: pointer;
	font-weight: 600;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255,255,255,0.1);
	transition: 0.3s;
}

.back:hover {
	background: rgba(96,165,250,0.2);
	transform: translateX(-3px);
}
</style>