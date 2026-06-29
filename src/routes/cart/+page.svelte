<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import {
		collection,
		getDocs,
		deleteDoc,
		doc,
		updateDoc
	} from 'firebase/firestore';

	import { goto } from '$app/navigation';

	let cartItems = [];

	async function loadCart() {
		const snapshot = await getDocs(collection(db, 'cart'));

		cartItems = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
	}

	onMount(loadCart);

	async function removeItem(id) {
		await deleteDoc(doc(db, 'cart', id));
		loadCart();
	}

	async function increase(index) {
		const item = cartItems[index];
		const newQty = (item.qty || 1) + 1;

		await updateDoc(doc(db, 'cart', item.id), {
			qty: newQty
		});

		loadCart();
	}

	async function decrease(index) {
		const item = cartItems[index];
		const current = item.qty || 1;

		if (current > 1) {
			await updateDoc(doc(db, 'cart', item.id), {
				qty: current - 1
			});

			loadCart();
		}
	}

	let coupon = '';

	$: subtotal =
		cartItems.reduce(
			(sum, item) => sum + Number(item.price) * (item.qty || 1),
			0
		);

	$: discount = coupon === 'SAVE10' ? subtotal * 0.1 : 0;

	$: total = subtotal - discount;
</script>

<section class="cart-page">
	<div class="cart-container">

		<!-- LEFT SIDE -->
		<div class="cart-left">
			<h1>🛒 Shopping Cart</h1>

			{#if cartItems.length === 0}
				<div class="empty-cart">
					<h2>Your Cart is Empty 😢</h2>
					<p>Add products to continue shopping</p>

					<button on:click={() => goto('/products')}>
						Continue Shopping
					</button>
				</div>
			{:else}
				{#each cartItems as item, i}
					<div class="cart-card">

						<img src={item.img || item.imageUrl} alt={item.name} />

						<div class="cart-info">
							<h3>{item.name}</h3>

							<p class="price">₹{item.price}</p>

							<p class="stock">🟢 In Stock</p>

							<div class="quantity">
								<button on:click={() => decrease(i)}>−</button>
								<span>{item.qty || 1}</span>
								<button on:click={() => increase(i)}>+</button>
							</div>
						</div>

						<button class="remove-btn" on:click={() => removeItem(item.id)}>
							🗑 Remove
						</button>

					</div>
				{/each}
			{/if}
		</div>

		<!-- RIGHT SIDE -->
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

			<hr />

			<input
				bind:value={coupon}
				placeholder="Coupon Code"
				class="coupon"
			/>

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

			<button class="checkout-btn" on:click={() => goto('/checkout')}>
				Proceed to Checkout →
			</button>
		</div>

	</div>
</section>

<style>
	:global(body) {
		margin: 0;
		background: #08111f;
		color: white;
		font-family: system-ui;
	}

	.cart-container {
		max-width: 1400px;
		margin: 40px auto;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 30px;
		padding: 0 20px;
	}

	.cart-card {
		display: flex;
		align-items: center;
		gap: 20px;
		background: #111827;
		padding: 20px;
		border-radius: 15px;
		margin-bottom: 15px;
	}

	.cart-card img {
		width: 120px;
		height: 120px;
		object-fit: contain;
		background: white;
		border-radius: 10px;
	}

	.cart-info {
		flex: 1;
	}

	.price {
		color: #60a5fa;
		font-size: 22px;
		font-weight: bold;
	}

	.quantity {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
	}

	.quantity button {
		width: 30px;
		height: 30px;
		background: #2563eb;
		color: white;
		border: none;
		border-radius: 6px;
	}

	.remove-btn {
		background: red;
		border: none;
		color: white;
		padding: 10px 15px;
		border-radius: 8px;
	}

	.summary {
		background: #111827;
		padding: 20px;
		border-radius: 15px;
		position: sticky;
		top: 20px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}

	.total {
		font-size: 20px;
		font-weight: bold;
		color: #60a5fa;
	}

	.coupon {
		width: 100%;
		padding: 10px;
		margin: 10px 0;
		border-radius: 8px;
		border: none;
		background: #1f2937;
		color: white;
	}

	.checkout-btn {
		width: 100%;
		margin-top: 20px;
		padding: 12px;
		background: #2563eb;
		border: none;
		color: white;
		border-radius: 10px;
		cursor: pointer;
	}
</style>