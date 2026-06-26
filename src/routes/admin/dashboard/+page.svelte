<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	let orders = [];

	let totalOrders = 0;
	let revenue = 0;
	let pending = 0;
	let delivered = 0;
	let cancelled = 0;

	onMount(async () => {

		const snapshot = await getDocs(collection(db, 'orders'));

		orders = snapshot.docs.map(d => d.data());

		totalOrders = orders.length;

		revenue = 0;
		pending = 0;
		delivered = 0;
		cancelled = 0;

		orders.forEach(o => {

			if (o.paymentStatus === "Paid") {
				revenue += o.total || 0;
			}

			if (o.status === "Pending") pending++;
			if (o.status === "Delivered") delivered++;
			if (o.status === "Cancelled") cancelled++;

		});

	});
</script>
<div class="container py-5">

	<h1>📊 Admin Dashboard</h1>

	<div class="grid">

		<div class="card">
			<h3>📦 Total Orders</h3>
			<p>{totalOrders}</p>
		</div>

		<div class="card">
			<h3>💰 Revenue</h3>
			<p>₹{revenue}</p>
		</div>

		<div class="card">
			<h3>⏳ Pending</h3>
			<p>{pending}</p>
		</div>

		<div class="card">
			<h3>🚚 Delivered</h3>
			<p>{delivered}</p>
		</div>

		<div class="card">
			<h3>❌ Cancelled</h3>
			<p>{cancelled}</p>
		</div>

	</div>

</div>

<style>
.container{
	max-width:900px;
	color:white;
}

.grid{
	display:grid;
	grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
	gap:15px;
}

.card{
	background:#0f172a;
	padding:20px;
	border-radius:15px;
	text-align:center;
	color:white;
}
</style>