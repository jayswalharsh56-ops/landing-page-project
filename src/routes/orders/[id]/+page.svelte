<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { db, auth } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	let order = null;
	let loading = true;

	onMount(() => {

		onAuthStateChanged(auth, async (user) => {

			if (!user) {
				alert("Please login first");
				return;
			}

			const id = $page.params.id;

			const docRef = doc(db, "orders", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {

				const data = docSnap.data();

				// 🔥 security check
				if (data.userId !== user.uid) {
					alert("Not allowed");
					return;
				}

				order = data;

			} else {
				alert("Order not found");
			}

			loading = false;
		});
	});
</script>

<div class="container py-5 text-white">

	{#if loading}
		<p>Loading...</p>
	{/if}

	{#if order}

		<h2>📦 Order Details</h2>

		<div class="card p-4 detail-card">

			<h4>👤 {order.customerName}</h4>

			<p><strong>📞 Phone:</strong> {order.phone}</p>

			<p><strong>🏠 Address:</strong> {order.address}</p>

			<p><strong>Status:</strong> {order.status}</p>

			<h5 class="mt-3">🛒 Products</h5>

			{#each order.items as item}
				<div class="item">
					<img src={item.imageUrl} alt="product" />

					<div>
						<p>{item.name}</p>
						<small>Qty: {item.qty}</small>
						<p>₹{item.price * item.qty}</p>
					</div>
				</div>
			{/each}

			<hr />

			<h4>Total: ₹{order.total}</h4>

		</div>

	{/if}

</div>

<style>
.container{
	max-width:900px;
}

.detail-card{
	background: rgba(255,255,255,0.06);
	backdrop-filter: blur(10px);
	border-radius: 16px;
	border: 1px solid rgba(255,255,255,0.1);
}

.item{
	display:flex;
	gap:15px;
	align-items:center;
	padding:10px 0;
	border-bottom:1px solid rgba(255,255,255,0.1);
}

.item img{
	width:90px;
	height:90px;
	object-fit:cover;
	border-radius:10px;
}
</style>