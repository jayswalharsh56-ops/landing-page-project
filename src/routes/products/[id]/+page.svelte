<script>
	import { page } from '$app/stores';
    import { goto } from '$app/navigation';
	import { products, watches, accessories } from '$lib/data/products';
    import { cart } from '$lib/stores/cart';

	$: id = $page.params.id;

	$: allProducts = [...products, ...watches, ...accessories];

	$: product = allProducts.find(p => p.id === id);
</script>

{#if product}
<div class="container py-5">

	<div class="row">
		<div class="col-md-6">
			<img
				src={product.img}
				alt={product.name}
				class="img-fluid"
			/>
		</div>

		<div class="col-md-6">
			<h1>{product.name}</h1>

			<h3>₹ {product.price}</h3>

			<p>{product.description}</p>

			<p>Stock: {product.stock}</p>

			<button class="btn btn-primary">
				Add To Cart
			</button>
           <button
	class="btn btn-success"
	on:click={async () => {
		cart.set([
			{
				id: product.id,
				name: product.name,
				price: product.price,
				qty: 1,
				imageUrl: product.img
			}
		]);

		await goto('/checkout');
	}}
>
	Buy Now
</button>
		</div>
	</div>

</div>

{:else}

<h2 class="text-danger text-center">
	Product Not Found
</h2>

{/if}
<style>
.container{
	max-width:1200px;
}

.row{
	background:white;
	border-radius:20px;
	padding:30px;
	box-shadow:0 10px 30px rgba(0,0,0,0.15);
	align-items:center;
}

.img-fluid{
	width:100%;
	max-height:450px;
	object-fit:contain;
	background:#f8fafc;
	padding:20px;
	border-radius:15px;
}

h1{
	font-size:2.5rem;
	font-weight:700;
	color:#0f172a;
	margin-bottom:15px;
}

h3{
	font-size:2rem;
	font-weight:700;
	color:#2563eb;
	margin-bottom:20px;
}

p{
	font-size:1rem;
	line-height:1.8;
	color:#475569;
}

.btn-primary{
	background:linear-gradient(135deg,#2563eb,#1d4ed8);
	border:none;
	padding:12px 25px;
	border-radius:12px;
	font-weight:600;
	transition:0.3s;
}

.btn-primary:hover{
	transform:translateY(-3px);
	box-shadow:0 10px 20px rgba(37,99,235,0.4);
}

.text-danger{
	font-size:2rem;
	font-weight:bold;
	margin-top:100px;
}

@media(max-width:768px){

	h1{
		font-size:2rem;
		text-align:center;
	}

	h3{
		font-size:1.5rem;
		text-align:center;
	}

	p{
		text-align:center;
	}

	.btn-primary{
		width:100%;
	}

	.img-fluid{
		margin-bottom:20px;
	}
}
</style>