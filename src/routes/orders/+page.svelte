<script>
	import { db, auth } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	let orders = [];
	let loading = true;

	onMount(() => {
		onAuthStateChanged(auth, async (user) => {

			if (!user) {
				loading = false;
				return;
			}

			const snapshot = await getDocs(collection(db, 'orders'));

			orders = snapshot.docs
				.map(doc => ({ id: doc.id, ...doc.data() }))
				.filter(order => order.userId === user.uid);

			loading = false;
		});
	});
</script>

<div class="container py-5">

	<h1 class="mb-4">📦 My Orders</h1>

	{#if loading}
		<p class="text-center">Loading...</p>
	{/if}

	{#if orders.length === 0 && !loading}
		<p class="text-danger text-center">
			No Orders Found
		</p>
	{/if}

	<!-- 🔥 ONLY ONE LOOP (CLICKABLE CARDS) -->
	{#each orders as order}

		<a href={`/orders/${order.id}`} class="order-card-link">

			<div class="card p-4 mb-3 order-card">

				<h5>👤 {order.customerName}</h5>

				<p><strong>Total:</strong> ₹{order.total}</p>

				<p>
					<strong>Status:</strong>
					<span class="badge bg-warning text-dark">
						{order.status}
					</span>
				</p>

			</div>

		</a>

	{/each}

</div>

<style>
.container{
	max-width: 900px;
}

.order-card-link{
	text-decoration:none;
	color:inherit;
	display:block;
}

.order-card{
	border-radius: 12px;
	background: rgba(255,255,255,0.06);
	color: white;
	border: 1px solid rgba(255,255,255,0.1);
	backdrop-filter: blur(10px);
	transition: 0.2s;
}

.order-card:hover{
	transform: scale(1.02);
	cursor: pointer;
}

h1{
	font-size:22px;
	color:white;
}
</style>