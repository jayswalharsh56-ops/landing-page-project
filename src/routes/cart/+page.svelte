<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let cartItems = [];

	async function loadCart() {
		const snapshot = await getDocs(collection(db, 'cart'));

		cartItems = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
	}

	onMount(() => {
		loadCart();
	});

	async function removeItem(id) {
		await deleteDoc(doc(db, 'cart', id));
		loadCart();
	}
</script>

<div class="container py-5">

	<h1 class="mb-4">🛒 My Cart</h1>

	{#if cartItems.length === 0}
		<h3>No items in cart</h3>
	{:else}

		{#each cartItems as item}
			<div class="card mb-3 p-3 d-flex flex-row align-items-center">

				<img src={item.imageUrl} width="80" class="me-3" />

				<div class="flex-grow-1">
					<h5>{item.name}</h5>
					<p>₹ {item.price}</p>
				</div>

				<button class="btn btn-danger" on:click={() => removeItem(item.id)}>
					Remove
				</button>

			</div>
		{/each}

	{/if}

</div>