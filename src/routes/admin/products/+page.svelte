<script>
	import { db } from '$lib/firebase';
	import {
		collection,
		addDoc,
		getDocs,
		deleteDoc,
		doc
	} from 'firebase/firestore';

	import { onMount } from 'svelte';

	let products = [];

	let name = "";
	let price = "";
	let imageUrl = "";
	let description = "";

	async function loadProducts() {
		const snapshot = await getDocs(collection(db, "products"));

		products = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
	}

	async function addProduct() {

		if (!name || !price || !imageUrl) {
			alert("Fill all fields");
			return;
		}

		await addDoc(collection(db, "products"), {
			name,
			price: Number(price),
			imageUrl,
			description
		});

		name = "";
		price = "";
		imageUrl = "";
		description = "";

		loadProducts();
	}

	async function deleteProduct(id) {

		if (!confirm("Delete Product?")) return;

		await deleteDoc(doc(db, "products", id));

		loadProducts();
	}

	onMount(loadProducts);
</script>

<div class="container py-5 text-white">

	<h1>📱 Product Admin Panel</h1>

	<div class="card p-4 mb-4 bg-dark">

		<input bind:value={name}
			class="form-control mb-2"
			placeholder="Product Name" />

		<input bind:value={price}
			class="form-control mb-2"
			placeholder="Price" />

		<input bind:value={imageUrl}
			class="form-control mb-2"
			placeholder="Image URL" />

		<textarea bind:value={description}
			class="form-control mb-2"
			placeholder="Description"></textarea>

		<button
			class="btn btn-success"
			on:click={addProduct}>
			Add Product
		</button>

	</div>

	{#each products as product}

		<div class="card bg-dark text-white p-3 mb-3">

			<div class="d-flex align-items-center gap-3">

				<img src={product.imageUrl} width="100" alt={product.name} />

				<div class="flex-grow-1">

					<h5>{product.name}</h5>

					<p>₹{product.price}</p>

				</div>

				<button
					class="btn btn-danger"
					on:click={() => deleteProduct(product.id)}
				>
					Delete
				</button>

			</div>

		</div>

	{/each}

</div>