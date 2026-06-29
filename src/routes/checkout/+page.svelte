<script>
	import { cart } from '$lib/stores/cart';
	import { db } from '$lib/firebase';
	import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	let name = '';
	let phone = '';
	let address = '';
	let loading = false;

	let cartItems = [];

	// subscribe cart
	cart.subscribe((value) => {
		cartItems = value;
	});

	// total calculate
	$: total = cartItems.reduce(
		(sum, item) => sum + item.price * (item.qty || 1),
		0
	);

	async function placeOrder() {
		if (!name || !phone || !address) {
			alert('Please fill all details');
			return;
		}

		if (cartItems.length === 0) {
			alert('Cart is empty');
			return;
		}

		loading = true;

		try {
			await addDoc(collection(db, 'orders'), {
				name,
				phone,
				address,
				items: cartItems,
				total,
				status: 'pending',
				createdAt: serverTimestamp()
			});

			// clear cart
			cart.clear();

			// go to success page
			goto('/success');
		} catch (err) {
			console.error(err);
			alert('Order failed');
		}

		loading = false;
	}
</script>

<section class="checkout">
	<h1>🧾 Checkout</h1>

	<div class="grid">
		<!-- FORM -->
		<div class="form">
			<input placeholder="Full Name" bind:value={name} />
			<input placeholder="Phone Number" bind:value={phone} />
			<textarea placeholder="Address" bind:value={address}></textarea>

			<button on:click={placeOrder} disabled={loading}>
				{loading ? 'Placing Order...' : 'Place Order'}
			</button>
		</div>

		<!-- SUMMARY -->
		<div class="summary">
			<h2>Order Summary</h2>

			{#each cartItems as item}
				<div class="item">
					<span>{item.name}</span>
					<span>₹{item.price}</span>
				</div>
			{/each}

			<hr />

			<h3>Total: ₹{total}</h3>
		</div>
	</div>
</section>

<style>
	.checkout {
		max-width: 1100px;
		margin: 50px auto;
		color: white;
		padding: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}

	.form input,
	.form textarea {
		width: 100%;
		padding: 12px;
		margin-bottom: 15px;
		border-radius: 10px;
		border: none;
		background: #1f2937;
		color: white;
	}

	button {
		width: 100%;
		padding: 14px;
		background: #2563eb;
		border: none;
		color: white;
		font-weight: bold;
		border-radius: 10px;
		cursor: pointer;
	}

	.summary {
		background: #111827;
		padding: 20px;
		border-radius: 15px;
	}

	.item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
</style>