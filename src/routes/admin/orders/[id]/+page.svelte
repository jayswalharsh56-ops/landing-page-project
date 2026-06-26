<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	let order = null;
	let loading = true;

	onMount(async () => {
		const id = $page.params.id;

		try {
			const snap = await getDoc(doc(db, 'orders', id));

			if (snap.exists()) {
				order = { id: snap.id, ...snap.data() };
			} else {
				order = null;
			}

		} catch (err) {
			console.log(err);
		}

		loading = false;
	});
</script>

<div class="container py-5">

	{#if loading}
		<p>Loading order...</p>

	{:else if !order}
		<div class="card p-4">
			<h3>❌ Order Not Found</h3>
		</div>

	{:else}

		<div class="card order-card">

			<h2>🧾 Order Details</h2>
            <button class="back-btn" on:click={() => window.location.href = "/admin/orders"}>
	⬅ Back to Orders
</button>

			<p><strong>Order ID:</strong> {order.id}</p>

			<p>
				<strong>Status:</strong>
				<span class={`status ${order.status?.toLowerCase()}`}>
					{order.status}
				</span>
			</p>

			<p><strong>Total:</strong> ₹{order.total}</p>

			<p>
				<strong>Date:</strong>
				{order.createdAt?.seconds
					? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
					: 'N/A'}
			</p>

			<hr />

			<h4>🛒 Products</h4>

			{#each order.items as item}

				<div class="product">

					<img src={item.imageUrl} alt={item.name} />

					<div>
						<h5>{item.name}</h5>
						<p>Qty: {item.qty}</p>
						<p>₹{item.price}</p>
					</div>

				</div>

			{/each}

		</div>

	{/if}

</div>

<style>
.container{
	max-width:900px;
}

.order-card{
	background:#0f172a;
	color:white;
	padding:25px;
	border-radius:15px;
}

.product{
	display:flex;
	gap:15px;
	align-items:center;
	padding:10px 0;
	border-top:1px solid rgba(255,255,255,0.1);
}

.product img{
	width:90px;
	height:90px;
	object-fit:cover;
	border-radius:10px;
}

.status{
	padding:5px 12px;
	border-radius:8px;
	font-size:12px;
}

.pending{ background:orange; }
.processing{ background:blue; }
.delivered{ background:green; }
.cancelled{ background:red; }

.back-btn{
	background:#1e293b;
	color:white;
	padding:8px 14px;
	border:none;
	border-radius:8px;
	margin-bottom:15px;
	cursor:pointer;
	transition:0.3s;
}

.back-btn:hover{
	background:#334155;
}

</style>