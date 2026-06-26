<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	let order = null;
	let loading = true;

	onMount(async () => {

		const unsubscribe = page.subscribe(async ($page) => {

			const id = $page.params.id;

			const snap = await getDoc(doc(db, "orders", id));

			if (snap.exists()) {
				order = { id: snap.id, ...snap.data() };
			}

			loading = false;
		});
	});

	function printInvoice() {
		window.print();
	}
</script>

<div class="container">

	{#if loading}
		<p>Loading invoice...</p>

	{:else if !order}
		<p>❌ Order not found</p>

	{:else}

		<div class="invoice">

			<h1>🧾 INVOICE</h1>

			<hr>

			<p><strong>Order ID:</strong> {order.id}</p>
			<p><strong>Name:</strong> {order.customerName}</p>
			<p><strong>Phone:</strong> {order.phone}</p>
			<p><strong>Address:</strong> {order.address}</p>

			<hr>

			<h3>Products</h3>

			{#each order.items || [] as item}
				<div class="item">
					<p>{item.name} × {item.qty}</p>
					<p>₹{item.price}</p>
				</div>
			{/each}

			<hr>

			<h2>Total: ₹{order.total}</h2>

		</div>

		<button class="btn" on:click={printInvoice}>
			🖨 Print Invoice
		</button>

	{/if}

</div>

<style>
.container{
	max-width:800px;
	margin:auto;
	padding:20px;
}

.invoice{
	background:white;
	color:black;
	padding:30px;
	border-radius:10px;
}

.item{
	display:flex;
	justify-content:space-between;
	padding:8px 0;
	border-bottom:1px solid #ddd;
}

.btn{
	margin-top:15px;
	background:black;
	color:white;
	padding:10px 15px;
	border:none;
	border-radius:8px;
	cursor:pointer;
}

@media print {
	.btn{
		display:none;
	}
}
</style>