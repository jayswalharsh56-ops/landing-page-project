<script>
	import { onMount } from 'svelte';
	import { db, auth } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	let orders = [];

	let totalOrders = 0;
	let revenue = 0;
	let pending = 0;
	let delivered = 0;
	let cancelled = 0;

	let loading = true;
	let isAdmin = false;

	onMount(() => {

		onAuthStateChanged(auth, async (user) => {

			if (!user) {
				window.location.href = "/";
				return;
			}

			// 🔒 Admin Security
        if (user.email !== "jayswalharsh56@gmail.com"){  

				alert("Access Denied ❌");

				window.location.href = "/";
				return;
			}

			isAdmin = true;

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

			loading = false;

		});

	});
</script>

{#if loading}

	<div class="container py-5">
		<h2>Loading...</h2>
	</div>

{:else if isAdmin}

	<div class="container py-5">

		<h1 class="mb-4">📊 Admin Dashboard</h1>

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

{/if}

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
	color:white;
	padding:20px;
	border-radius:15px;
	text-align:center;
	border:1px solid rgba(255,255,255,0.1);
}

.card h3{
	margin-bottom:10px;
}

.card p{
	font-size:22px;
	font-weight:bold;
}
</style>