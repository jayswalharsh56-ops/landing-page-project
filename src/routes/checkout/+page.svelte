 

<script>
	import { cart } from '$lib/stores/cart';
	import { db, auth } from '$lib/firebase';
	import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';

    onMount(() => {
	const script = document.createElement('script');
	script.src = 'https://checkout.razorpay.com/v1/checkout.js';
	script.async = true;
	document.body.appendChild(script);
});

	let name = "";
	let address = "";
	let phone = "";
	let paymentMethod = "COD";

	$: items = $cart;
    $: console.log("Cart Items:", items);

	$: total = items.reduce(
		(sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
		0
	);
    
	function payWithRazorpay(orderId, amount) {

		const options = {
			key: "YOUR_RAZORPAY_KEY",
			amount: amount * 100,
			currency: "INR",
			name: "My Store",

			handler: async function (response) {

				await updateDoc(doc(db, "orders", orderId), {
					paymentStatus: "Paid",
					paymentMethod: "Razorpay",
					status: "Processing",
					paymentId: response.razorpay_payment_id
				});

				alert("Payment Successful 🎉");
			}
		};

		new Razorpay(options).open();
	}

	async function placeOrder() {

		if (!auth.currentUser) {
			alert("Please login first");
			return;
		}

		if (!name || !address || !phone) {
			alert("Please fill all details");
			return;
		}

		if (items.length === 0) {
			alert("Cart is empty");
			return;
		}

		try {
           console.log({
	paymentMethod,
	paymentStatus: "Unpaid"
});
			const docRef = await addDoc(collection(db, 'orders'), {
				customerName: name,
				phone,
				address,
				items,
				total,
				status: "Pending",
				paymentMethod,
				paymentStatus: "Unpaid",
				createdAt: new Date(),
				userId: auth.currentUser.uid
			});

			if (paymentMethod === "Razorpay") {
				payWithRazorpay(docRef.id, total);
			} else {
				alert("COD Order Placed 🎉");
			}

			cart.clear();

			name = "";
			phone = "";
			address = "";

		} catch (err) {
			alert(err.message);
		}
	}
</script>

<div class="container py-5 text-white">

	<h2 class="mb-4">🛒 Checkout</h2>

	<div class="row g-4">

		<div class="col-md-6">

			<div class="card p-4 checkout-card">

				<h4 class="mb-3">Customer Details</h4>

				<input
					bind:value={name}
					placeholder="Full Name"
					class="form-control mb-3"
				/>

				<input
					bind:value={phone}
					placeholder="Phone Number"
					class="form-control mb-3"
				/>

				<textarea
					bind:value={address}
					placeholder="Address"
					class="form-control mb-3"
				></textarea>

				<h5 class="mb-3">💳 Payment Method</h5>

				<div class="mb-3">

					<label class="d-block mb-2">
						<input
							type="radio"
							bind:group={paymentMethod}
							value="COD"
						/>
						Cash on Delivery
					</label>

					<label class="d-block">
						<input
							type="radio"
							bind:group={paymentMethod}
							value="Razorpay"
						/>
						Pay Online (Razorpay)
					</label>

				</div>

				<button
					class="btn btn-success w-100"
					on:click={placeOrder}
				>
					Place Order
				</button>

			</div>

		</div>

		<div class="col-md-6">

			<div class="card p-4 checkout-card">

				<h4>Order Summary</h4>

				{#each items as item}

					<div class="d-flex justify-content-between border-bottom py-2">

						<span>
							{item.name} × {item.qty}
						</span>

						<span>
							₹{item.price * item.qty}
						</span>

					</div>

				{/each}

				<hr />

				<h5>Total: ₹{total}</h5>

				<p class="mt-2">
					Selected Payment:
					<strong>{paymentMethod}</strong>
				</p>

			</div>

		</div>

	</div>

</div>

<style>
	.checkout-card {
		background: rgba(255,255,255,0.06);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		color: white;
		border: 1px solid rgba(255,255,255,0.1);
	}

	.checkout-card input,
	.checkout-card textarea {
		background: rgba(255,255,255,0.1);
		border: none;
		color: white;
	}

	.checkout-card input::placeholder,
	.checkout-card textarea::placeholder {
		color: #ccc;
	}

	.checkout-card textarea {
		min-height: 120px;
	}
</style>

