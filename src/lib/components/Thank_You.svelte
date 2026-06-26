<script>
	export let item;
</script>

<div class="product">
	<img src={item.img} alt="" class="img" />

	<h3>{item.name}</h3>
	<p>₹{item.price}</p>
	<p>Qty: {item.qty}</p>
</div>