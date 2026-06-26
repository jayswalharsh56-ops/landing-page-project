<script>
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase';
	import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
	import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	let user = null;
	let orders = [];
	let loading = true;

	onMount(() => {
		onAuthStateChanged(auth, async (u) => {

			user = u;

			if (!u) {
				loading = false;
				return;
			}

			const snapshot = await getDocs(collection(db, 'orders'));

			orders = snapshot.docs
				.map(doc => ({ id: doc.id, ...doc.data() }))
				.filter(order => order.userId === u.uid);

			loading = false;
		});
	});

	async function login() {
		await signInWithPopup(auth, new GoogleAuthProvider());
	}

	async function logout() {
		await signOut(auth);
		user = null;
		orders = [];
	}

	async function cancelOrder(orderId, status) {

		if (status !== "Pending" && status !== "Processing") {
			return alert("❌ Cannot cancel now");
		}

		await updateDoc(doc(db, 'orders', orderId), {
			status: "Cancelled",
			paymentStatus: "Cancelled"
		});

		orders = orders.map(o =>
			o.id === orderId ? { ...o, status: "Cancelled" } : o
		);

		alert("Order Cancelled");
	}
</script>
<div class="container py-5">

	<h1 class="mb-4">👤 My Profile</h1>

	{#if !user}

		<div class="profile-card">
			<h3>Login Required</h3>
			<p>Please login to view orders</p>

			<button class="btn-login" on:click={login}>
				🔐 Login with Google
			</button>
		</div>

	{:else}

		<div class="profile-card">

			<img src={user.photoURL || '/default.png'} class="profile-img" />

			<h3>{user.displayName}</h3>
			<p>{user.email}</p>

			<button class="btn-logout" on:click={logout}>
				🚪 Logout
			</button>

		</div>

		<h2 class="mt-4">📦 My Orders</h2>

		{#if loading}
			<p>Loading...</p>

		{:else if orders.length === 0}
			<div class="profile-card">
				No Orders Found 😔
			</div>

		{:else}

			{#each orders as order}

				<div class="order-card">

					<a href={`/orders/${order.id}`} class="order-link">

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

						{#each order.items as item}

							<div class="product-item">

								<img src={user.photoURL || '/default.png'} class="profile-img" alt="profile image" />

								<div>
									<p><strong>{item.name}</strong></p>
									<p>Qty: {item.qty}</p>
								</div>

							</div>

						{/each}

					</a>

					<button
						class="btn-cancel"
						on:click|stopPropagation={() => cancelOrder(order.id, order.status)}
					>
						❌ Cancel Order
					</button>

				</div>

			{/each}

		{/if}

	{/if}

</div>

<style>
.container{
	max-width:900px;
}

.profile-card{
	background:rgba(255,255,255,0.06);
	padding:20px;
	border-radius:15px;
	text-align:center;
	color:white;
	margin-bottom:20px;
}

.profile-img{
	width:100px;
	height:100px;
	border-radius:50%;
	object-fit:cover;
}

.order-card{
	background:#0f172a;
	color:white;
	padding:20px;
	border-radius:15px;
	margin-bottom:15px;
}

.order-link{
	text-decoration:none;
	color:white;
}

.product-item{
	display:flex;
	gap:10px;
	align-items:center; 
	padding:10px 0;
	border-top:1px solid rgba(255,255,255,0.1);
}

.product-img{
	width:70px;
	height:70px;
	border-radius:10px;
	object-fit:cover;
}

.status{
	padding:4px 10px;
	border-radius:8px;
	font-size:12px;
}

.pending{ background:orange; }
.processing{ background:blue; }
.delivered{ background:green; }
.cancelled{ background:red; }

.btn-login{
	background:#3b82f6;
	color:white;
	padding:10px 15px;
	border:none;
	border-radius:10px;
	cursor:pointer;
}

.btn-logout{
	background:red;
	color:white;
	padding:10px 15px;
	border:none;
	border-radius:10px;
	cursor:pointer;
	margin-top:10px;
}

.btn-cancel{
	background:red;
	color:white;
	padding:8px 12px;
	border:none;
	border-radius:8px;
	cursor:pointer;
	margin-top:10px;
}
</style>