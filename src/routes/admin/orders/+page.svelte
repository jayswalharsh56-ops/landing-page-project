<script>
	import { onMount } from 'svelte';
	import { db, auth } from '$lib/firebase';
	import {
		collection,
		getDocs,
		doc,
		updateDoc,
		deleteDoc
	} from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';

	let isAdmin = false;
	let orders = [];

	async function loadOrders() {
		const snapshot = await getDocs(collection(db, 'orders'));

		orders = snapshot.docs.map((docItem) => ({
			id: docItem.id,
			...docItem.data()
		}));
	}

	async function updateStatus(orderId, newStatus) {
		const orderRef = doc(db, 'orders', orderId);

		await updateDoc(orderRef, {
			status: newStatus
		});

		await loadOrders();
	}

	async function deleteOrder(orderId) {
		if (!confirm('Are you sure you want to delete this order?')) return;

		await deleteDoc(doc(db, 'orders', orderId));

		await loadOrders();
	}

	onMount(() => {
		onAuthStateChanged(auth, async (user) => {

			if (!user) {
				window.location.href = "/";
				return;
			}

			if (user.email !== "jayswalharsh56@gmail.com") {
				alert("Access Denied");
				window.location.href = "/";
				return;
			}

			isAdmin = true;

			await loadOrders();
		});
	});
</script>

{#if !isAdmin}
	<div class="container py-5">
		<h3>Loading...</h3>
	</div>
{:else}

<div class="container py-5">

	<h1 class="mb-4">📦 Orders Admin Panel</h1>

	<h5 class="mb-3">Total Orders: {orders.length}</h5>

	{#if orders.length === 0}

		<p>No Orders Found</p>

	{:else}

		{#each orders as order}

			<!-- ORDER CARD LINK -->
			
				<div class="card mb-4 p-4 shadow order-card">

					<div class="d-flex justify-content-between align-items-center">

						<h4>{order.customerName}</h4>

						<button
							class="btn btn-danger btn-sm"
							on:click|stopPropagation={() => deleteOrder(order.id)}
						>
							Delete
						</button>

					</div>

					<hr>

					<p><strong>Phone:</strong> {order.phone}</p>
					<p><strong>Address:</strong> {order.address}</p>
					<p><strong>Total:</strong> ₹{order.total}</p>
                    <p>
	<strong>Payment:</strong>

	{#if order.paymentStatus === "Paid"}
		<span class="badge bg-success">Paid</span>
	{:else}
		<span class="badge bg-danger">Unpaid</span>
	{/if}
</p>

<p>
	<strong>Method:</strong>
	{order.paymentMethod || "COD"}
</p>

<p>
	<strong>Date:</strong>

	{#if order.createdAt?.seconds}
		{new Date(order.createdAt.seconds * 1000).toLocaleString()}
	{:else}
		N/A
	{/if}
</p>
<p>
	<strong>Current Status:</strong>

	<span class={`status ${order.status?.toLowerCase()}`}>
		{order.status}
	</span>
</p>
					<p>
						<strong>Status:</strong>
						<select
							class="form-select"
							bind:value={order.status}
							on:change={(e) =>
								updateStatus(order.id, e.target.value)}
							on:click|stopPropagation
						>
							<option value="Pending">Pending</option>
							<option value="Processing">Processing</option>
							<option value="Shipped">Shipped</option>
							<option value="Delivered">Delivered</option>
							<option value="Cancelled">Cancelled</option>
						</select>
					</p>

					<h5 class="mt-3">Products</h5>

					{#each (order.items || []) as item}

						<div class="product-item">

							<img
	src={item.imageUrl || 'https://via.placeholder.com/90'}
	alt={item.name}
/>

							<div>
								<h6>{item.name}</h6>
								<p>Qty: {item.qty}</p>
								<p>₹{item.price}</p>
							</div>

						</div>

					{/each}

				</div>

		

		{/each}

	{/if}

</div>

{/if}

<style>
	.order-card{
		border-radius:15px;
		background:rgba(255,255,255,0.06);
		color:white;
		backdrop-filter:blur(10px);
		border:1px solid rgba(255,255,255,0.1);
	}

	.product-item{
		display:flex;
		gap:15px;
		align-items:center;
		padding:10px 0;
		border-bottom:1px solid rgba(255,255,255,0.1);
	}

	.product-item img{
		width:90px;
		height:90px;
		object-fit:cover;
		border-radius:10px;
	}
    .status{
	padding:5px 10px;
	border-radius:8px;
	font-size:12px;
	font-weight:bold;
}

.pending{
	background:orange;
	color:black;
}

.processing{
	background:#3b82f6;
	color:white;
}

.shipped{
	background:purple;
	color:white;
}

.delivered{
	background:green;
	color:white;
}

.cancelled{
	background:red;
	color:white;
}
</style>