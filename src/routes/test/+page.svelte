<script>
	import { db } from '$lib/firebase';
	import { collection, addDoc } from 'firebase/firestore';

	async function addProduct() {
		try {
			await addDoc(collection(db, 'products'), {
				name: 'iPhone 15',
				price: 79999
			});

			alert('Product Added Successfully!');
		} catch (error) {
			console.error(error);
			alert('Error: ' + error.message);
		}
	}
</script>

<h1>Firebase Test</h1>

<button onclick={addProduct}>
	Add Product
</button>