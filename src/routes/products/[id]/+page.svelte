<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { allProducts } from '$lib/products';
	import { cart } from '$lib/stores/cart';

	let quantity = 1;
	let product;

	$: {
		const id = $page.params.id;
		product = allProducts.find((p) => p.id === id);
	}

	function increase() {
		quantity++;
	}

	function decrease() {
		if (quantity > 1) quantity--;
	}

	function addToCart() {
		for (let i = 0; i < quantity; i++) {
			cart.add(product);
		}
	}

	function buyNow() {
		addToCart();
		goto("/cart");
	}
</script>
{#if !product}

<div class="not-found">
	<h2>❌ Product Not Found</h2>
	<a href="/products">← Back to Products</a>
</div>

{:else}

<section class="product-details">

	<div class="details-container">

		<!-- LEFT -->
		<div class="image-section">

			<div class="main-image">
				<img
					src={product.imageUrl}
					alt={product.name}
				/>
			</div>

		</div>

		<!-- RIGHT -->
		<div class="info-section">

			<div class="offer">
				{product.offer}
			</div>

			<h1>{product.name}</h1>

			<div class="rating">
				{"⭐".repeat(product.rating)}
				<span>({product.rating}.0)</span>
			</div>

			<div class="price-box">

				<span class="price">
					₹{product.price}
				</span>

				{#if product.oldPrice}
				<span class="old-price">
					₹{product.oldPrice}
				</span>
				{/if}

			</div>

			<div class="stock">

				{#if product.stock > 0}
					🟢 In Stock ({product.stock} Left)
				{:else}
					🔴 Out of Stock
				{/if}

			</div>

			<p class="description">
				{product.description}
			</p>

			<!-- Quantity -->

			<div class="quantity">

				<button on:click={decrease}>
					−
				</button>

				<span>{quantity}</span>

				<button on:click={increase}>
					+
				</button>

			</div>

			<!-- Buttons -->

			<div class="buttons">

				<button
					class="cart-btn"
					on:click={addToCart}
				>
					🛒 Add To Cart
				</button>

				<button
					class="buy-btn"
					on:click={buyNow}
				>
					⚡ Buy Now
				</button>

			</div>

			<button
				class="back-btn"
				on:click={() => history.back()}
			>
				← Back
			</button>

		</div>

	</div>

</section>
<!-- ================= SPECIFICATIONS ================= -->

<section class="extra-section">

	<div class="spec-card">

		<h2>📋 Specifications</h2>

		<div class="spec-grid">

			<div><strong>Category</strong><br>{product.category}</div>

			<div><strong>Stock</strong><br>{product.stock} Units</div>

			<div><strong>Rating</strong><br>{product.rating}/5 ⭐</div>

			<div><strong>Delivery</strong><br>2-4 Days</div>

		</div>

	</div>

</section>

<!-- ================= REVIEWS ================= -->

<section class="extra-section">

	<h2>⭐ Customer Reviews</h2>

	{#if product.reviews}

		<div class="review-grid">

			{#each product.reviews as review}

				<div class="review-card">

					<h3>{review.user}</h3>

					<div class="stars">
						{"⭐".repeat(review.stars)}
					</div>

					<p>{review.text}</p>

				</div>

			{/each}

		</div>

	{:else}

		<p>No reviews available.</p>

	{/if}

</section>

<!-- ================= RELATED PRODUCTS ================= -->

<section class="extra-section">

	<h2>🔥 Related Products</h2>

	<div class="related-grid">

		{#each allProducts
			.filter(
				p =>
					p.category === product.category &&
					p.id !== product.id
			)
			.slice(0,4) as item}

			<div class="related-card">

				<a href={`/products/${item.id}`}>

					<img
						src={item.imageUrl}
						alt={item.name}
					/>

				</a>

				<h3>{item.name}</h3>

				<p>₹{item.price}</p>

				<button
					on:click={() => cart.add(item)}
				>
					Add To Cart
				</button>

			</div>

		{/each}

	</div>

</section>

{/if}
<style>
	:global(body){
	margin:0;
	background:#08111f;
	font-family:system-ui,sans-serif;
	color:white;
}

/* PAGE */

.product-details{
	padding:70px 20px;
	min-height:100vh;
}

.details-container{
	max-width:1300px;
	margin:auto;
	display:grid;
	grid-template-columns:1fr 1fr;
	gap:60px;
	align-items:center;
}

/* IMAGE */

.main-image{
	background:#111827;
	border-radius:25px;
	padding:40px;
	border:1px solid rgba(255,255,255,.08);
	box-shadow:0 20px 40px rgba(0,0,0,.35);
}

.main-image img{
	width:100%;
	height:500px;
	object-fit:contain;
	transition:.35s;
}

.main-image img:hover{
	transform:scale(1.05);
}

/* INFO */

.offer{
	display:inline-block;
	background:#2563eb;
	padding:8px 16px;
	border-radius:30px;
	font-size:13px;
	font-weight:700;
	margin-bottom:20px;
}

.info-section h1{
	font-size:42px;
	margin:0;
	font-weight:900;
}

.rating{
	margin:18px 0;
	font-size:18px;
	color:#facc15;
}

.rating span{
	color:#94a3b8;
	margin-left:8px;
}

.price-box{
	display:flex;
	align-items:center;
	gap:15px;
	margin:20px 0;
}

.price{
	font-size:40px;
	font-weight:900;
	color:#60a5fa;
}

.old-price{
	font-size:22px;
	color:#6b7280;
	text-decoration:line-through;
}

.stock{
	color:#22c55e;
	font-weight:700;
	margin-bottom:20px;
}

.description{
	color:#cbd5e1;
	line-height:1.8;
	font-size:16px;
}

/* QUANTITY */

.quantity{
	display:flex;
	align-items:center;
	gap:18px;
	margin:35px 0;
}

.quantity button{
	width:48px;
	height:48px;
	border:none;
	border-radius:12px;
	background:#2563eb;
	color:white;
	font-size:22px;
	cursor:pointer;
	transition:.3s;
}

.quantity button:hover{
	background:#1d4ed8;
}

.quantity span{
	font-size:22px;
	font-weight:700;
	min-width:30px;
	text-align:center;
}

/* BUTTONS */

.buttons{
	display:flex;
	gap:18px;
	flex-wrap:wrap;
	margin-top:15px;
}

.cart-btn,
.buy-btn{
	flex:1;
	padding:16px;
	border:none;
	border-radius:12px;
	font-size:16px;
	font-weight:700;
	cursor:pointer;
	transition:.3s;
}

.cart-btn{
	background:#2563eb;
	color:white;
}

.buy-btn{
	background:#16a34a;
	color:white;
}

.cart-btn:hover,
.buy-btn:hover{
	transform:translateY(-4px);
}

/* BACK */

.back-btn{
	margin-top:30px;
	background:#1f2937;
	color:white;
	border:none;
	padding:14px 22px;
	border-radius:12px;
	cursor:pointer;
	font-weight:700;
}

.back-btn:hover{
	background:#374151;
}

/* NOT FOUND */

.not-found{
	text-align:center;
	padding:100px 20px;
}

.not-found a{
	color:#60a5fa;
	text-decoration:none;
}

/* MOBILE */

@media(max-width:900px){

	.details-container{
		grid-template-columns:1fr;
		gap:35px;
	}

	.main-image img{
		height:320px;
	}

	.info-section h1{
		font-size:30px;
	}

	.price{
		font-size:32px;
	}

	.buttons{
		flex-direction:column;
	}
}
/* ================= EXTRA SECTION ================= */

.extra-section{
	max-width:1300px;
	margin:70px auto;
	padding:0 20px;
}

.extra-section h2{
	font-size:32px;
	margin-bottom:25px;
}

/* Specifications */

.spec-card{
	background:#111827;
	padding:30px;
	border-radius:20px;
	border:1px solid rgba(255,255,255,.08);
}

.spec-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.spec-grid div{
	background:#1f2937;
	padding:20px;
	border-radius:14px;
}

/* Reviews */

.review-grid{
	display:grid;
	grid-template-columns:repeat(2,1fr);
	gap:20px;
}

.review-card{
	background:#111827;
	padding:25px;
	border-radius:18px;
	border:1px solid rgba(255,255,255,.08);
}

.stars{
	color:#facc15;
	margin:10px 0;
}

/* Related */

.related-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
}

.related-card{
	background:#111827;
	padding:20px;
	border-radius:18px;
	text-align:center;
	border:1px solid rgba(255,255,255,.08);
	transition:.3s;
}

.related-card:hover{
	transform:translateY(-6px);
}

.related-card img{
	width:100%;
	height:180px;
	object-fit:contain;
}

.related-card h3{
	font-size:18px;
	margin:15px 0 10px;
}

.related-card p{
	color:#60a5fa;
	font-weight:700;
	font-size:20px;
}

.related-card button{
	margin-top:15px;
	width:100%;
	padding:12px;
	border:none;
	border-radius:10px;
	background:#2563eb;
	color:white;
	font-weight:700;
	cursor:pointer;
}

/* Responsive */

@media(max-width:900px){

	.spec-grid,
	.review-grid,
	.related-grid{
		grid-template-columns:1fr;
	}

}
</style>