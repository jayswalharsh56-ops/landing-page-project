<script>
	import { db } from '$lib/firebase';
	import {
		collection,
		getDocs,
		deleteDoc,
		doc
	} from 'firebase/firestore';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let cartItems = [];

	async function loadCart() {
		const snapshot = await getDocs(collection(db, "cart"));

		cartItems = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
	}

	onMount(loadCart);

	async function removeItem(id) {
	await deleteDoc(doc(db, "cart", id));
	loadCart();
}

function increase(index) {
	cartItems[index].qty = (cartItems[index].qty || 1) + 1;
	cartItems = [...cartItems];
}

function decrease(index) {
	if ((cartItems[index].qty || 1) > 1) {
		cartItems[index].qty--;
		cartItems = [...cartItems];
	}
}

let coupon = "";

$: subtotal = cartItems.reduce(
	(sum, item) => sum + Number(item.price) * (item.qty || 1),
	0
);

$: discount = coupon === "SAVE10"
	? subtotal * 0.10
	: 0;

$: total = subtotal - discount;
</script>
<section class="cart-page">

	<div class="cart-container">

		<!-- LEFT -->

		<div class="cart-left">

			<h1>🛒 Shopping Cart</h1>

			{#if cartItems.length === 0}

				<div class="empty-cart">

					<h2>Your Cart is Empty 😢</h2>

					<p>Add products to continue shopping.</p>

					<button on:click={() => goto("/products")}>
						Continue Shopping
					</button>

				</div>

			{:else}

				{#each cartItems as item, i}
					<div class="cart-card">

						<img
							src={item.imageUrl}
							alt={item.name}
						/>

						<div class="cart-info">

							<h3>{item.name}</h3>

							<p class="price">
								₹{item.price}
							</p>

							<p class="stock">
								🟢 In Stock
							</p>
							<div class="quantity">

	<button on:click={() => decrease(i)}>
		−
	</button>

	<span>{item.qty || 1}</span>

	<button on:click={() => increase(i)}>
		+
	</button>

</div>

						</div>

						<button
							class="remove-btn"
							on:click={() => removeItem(item.id)}
						>
							🗑 Remove
						</button>

					</div>

				{/each}

			{/if}

		</div>

		<!-- RIGHT -->

		<div class="summary">

			<h2>Order Summary</h2>

			<div class="row">
				<span>Items</span>
				<span>{cartItems.length}</span>
			</div>

			<div class="row">
				<span>Shipping</span>
				<span>FREE</span>
			</div>

			<hr>
			<div class="coupon">

	<input
		bind:value={coupon}
		placeholder="Coupon Code"
	/>

</div>

<div class="row">
	<span>Subtotal</span>
	<span>₹{subtotal}</span>
</div>

<div class="row">
	<span>Discount</span>
	<span>- ₹{discount}</span>
</div>

			<div class="row total">

				<span>Total</span>

				<span>₹{total}</span>

			</div>

			<button
				class="checkout-btn"
				on:click={() => goto("/checkout")}
			>
				Proceed to Checkout →
			</button>

		</div>

	</div>

</section>
<style>
	:global(body){
	margin:0;
	background:#08111f;
	font-family:system-ui,sans-serif;
	color:white;
}

.cart-page{
	max-width:1400px;
	margin:50px auto;
	padding:0 20px;
}

.cart-container{
	display:grid;
	grid-template-columns:2fr 1fr;
	gap:30px;
	align-items:start;
}

/* LEFT */

.cart-left h1{
	font-size:38px;
	margin-bottom:25px;
}

.cart-card{
	display:flex;
	align-items:center;
	gap:20px;
	background:#111827;
	padding:20px;
	border-radius:20px;
	margin-bottom:20px;
	border:1px solid rgba(255,255,255,.08);
	transition:.3s;
}

.cart-card:hover{
	transform:translateY(-5px);
	box-shadow:0 20px 40px rgba(37,99,235,.25);
}

.cart-card img{
	width:140px;
	height:140px;
	object-fit:contain;
	background:white;
	border-radius:15px;
	padding:10px;
}

.cart-info{
	flex:1;
}

.cart-info h3{
	font-size:24px;
	margin-bottom:10px;
}

.price{
	font-size:28px;
	font-weight:800;
	color:#60a5fa;
}

.stock{
	color:#22c55e;
	font-weight:700;
	margin-top:10px;
}

.remove-btn{
	border:none;
	background:#ef4444;
	color:white;
	padding:12px 18px;
	border-radius:10px;
	cursor:pointer;
	font-weight:700;
}

.remove-btn:hover{
	background:#dc2626;
}

/* RIGHT */

.summary{
	position:sticky;
	top:20px;
	background:#111827;
	padding:25px;
	border-radius:20px;
	border:1px solid rgba(255,255,255,.08);
}

.summary h2{
	margin-bottom:25px;
}

.row{
	display:flex;
	justify-content:space-between;
	margin-bottom:18px;
	font-size:18px;
}

.total{
	font-size:26px;
	font-weight:800;
	color:#60a5fa;
}

.checkout-btn{
	width:100%;
	margin-top:25px;
	padding:15px;
	border:none;
	border-radius:12px;
	background:#2563eb;
	color:white;
	font-size:18px;
	font-weight:700;
	cursor:pointer;
	transition:.3s;
}

.checkout-btn:hover{
	background:#1d4ed8;
	transform:translateY(-3px);
}

/* EMPTY CART */

.empty-cart{
	text-align:center;
	background:#111827;
	padding:60px;
	border-radius:20px;
}

.empty-cart button{
	margin-top:20px;
	padding:14px 30px;
	border:none;
	border-radius:10px;
	background:#2563eb;
	color:white;
	cursor:pointer;
	font-weight:700;
}

/* Responsive */

@media(max-width:900px){

	.cart-container{
		grid-template-columns:1fr;
	}

	.cart-card{
		flex-direction:column;
		text-align:center;
	}

	.cart-card img{
		width:180px;
		height:180px;
	}

	.summary{
		position:static;
	}

}
.quantity{
	display:flex;
	align-items:center;
	gap:12px;
	margin-top:15px;
}

.quantity button{
	width:36px;
	height:36px;
	border:none;
	border-radius:8px;
	background:#2563eb;
	color:white;
	font-size:20px;
	cursor:pointer;
}

.quantity span{
	font-size:18px;
	font-weight:700;
	min-width:25px;
	text-align:center;
}

.coupon{
	margin-bottom:20px;
}

.coupon input{
	width:100%;
	padding:12px;
	border:none;
	border-radius:10px;
	background:#1f2937;
	color:white;
	outline:none;
}
</style>