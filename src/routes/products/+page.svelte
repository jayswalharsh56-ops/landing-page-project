    <script>
       import { products, watches, accessories } from '$lib/data/products';
       import { cart } from '$lib/stores/cart';
       


        let selectedProduct = null;
        

        let activeCategory = "all";
        let cartOpen = false;

        // 🔗 merge data
        $: allProducts = [...products, ...watches, ...accessories];

        // 🔍 filter system
        $: filteredProducts =
	activeCategory === "all"
		? allProducts
		: activeCategory === "phones"
			? products
			: activeCategory === "watches"
				? watches
				: accessories;

        // 📦 open product
        function openProduct(product) {
            selectedProduct = product;
        }

      function addToCart(product) {
	cart.update(items => {
		const existing = items.find(i => i.id === product.id);

		if (existing) {
			existing.qty += 1;
			return [...items];
		}

		return [...items, {
			id: product.id,
			name: product.name,
			price: Number(product.price),
			imageUrl: product.img,
			qty: 1
		}];
	});
}

function removeItem(id) {
cart.update(items => items.filter(i => i.id !== id));
}

function updateQty(id, type) {
cart.update(items =>
items
.map(item => {
if (item.id === id) {
return {
...item,
qty: type === "inc" ? item.qty + 1 : item.qty - 1
};
}
return item;
})
.filter(item => item.qty > 0)
);
}


        // 💰 total
       $: total = $cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    </script>
    <div class="text-center mb-4">

        <button class="btn btn-light me-2" on:click={() => activeCategory="all"}>
            All
        </button>

        <button class="btn btn-primary me-2" on:click={() => activeCategory="phones"}>
            Phones
        </button>

        <button class="btn btn-success" on:click={() => activeCategory="watches"}>
            Watches
        </button>
        <button class="btn btn-info" on:click={() => activeCategory="accessories"}>
	Accessories
</button>
        {#if selectedProduct}
<div class="container py-4">

	<button class="btn btn-secondary mb-3"
		on:click={() => selectedProduct = null}>
		⬅ Back
	</button>

	<div class="row">
		<div class="col-md-6">
			<img src={selectedProduct.img} class="img-fluid product-img" alt={selectedProduct.name} />
		</div>

		<div class="col-md-6">
			<h2>{selectedProduct.name}</h2>
			<h4>₹ {selectedProduct.price}</h4>
			<p>{selectedProduct.description}</p>

			<button
class="btn btn-primary"
on:click={() => addToCart(selectedProduct)}

>
Add to Cart

</button>

		</div>
	</div>

</div>
{/if}

        <!-- 🛒 CART OPEN -->
        <button class="btn btn-warning ms-3" on:click={() => cartOpen = true}>
           Cart ({$cart.length})
        </button>

        <p class="mt-2 text-success">
	Cart Count: {$cart.length}
</p>

    </div>
    <div class="row g-4">

        {#each filteredProducts as product}

            <div class="col-12 col-sm-6 col-md-4 col-lg-3">

                <div class="card product-card">

                    <img src={product.img} class="product-img" alt={product.name} />
                    <div class="card-body text-center">

                        <h5>{product.name}</h5>
                        <p>ID: {product.id}</p>
<p>₹ {product.price}</p>

{#if product.stock > 0}
	<p class="text-success">Stock: {product.stock}</p>

	<button class="btn btn-success w-100 mt-2"
		on:click={() => addToCart(product)}>
		Add to Cart
	</button>
{:else}
	<p class="text-danger">Out of Stock</p>

	<button class="btn btn-secondary w-100 mt-2" disabled>
		Out of Stock
	</button>
{/if}

                       <a
	href={`/products/${product.id}`}
	class="btn btn-primary w-100"
>
	View Details
</a>
                        

                    </div>

                </div>

            </div>

        {/each}

    </div>
    {#if cartOpen}
    <div class="cart-drawer">

        <h3>🛒 Cart</h3>
{#each $cart as item}

            <div class="cart-item">

                <p>{item.name}</p>
                <p>₹ {item.price}</p>

                <div class="qty">
                    <button on:click={() => updateQty(item.id, "dec")}>-</button>
                    <span>{item.qty}</span>
                    <button on:click={() => updateQty(item.id, "inc")}>+</button>
                </div>

                <button on:click={() => removeItem(item.id)}>❌</button>

            </div>

        {/each}

        <hr />

        <h4>Total: ₹{total}</h4>

        <a href="/checkout" class="btn btn-success w-100">
	Checkout
</a>

        <button class="btn btn-danger w-100 mt-2"
            on:click={() => cartOpen = false}>
            Close
        </button>

    </div>
    {/if}
