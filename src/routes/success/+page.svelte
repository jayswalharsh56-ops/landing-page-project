<script>
	import { goto } from '$app/navigation';
</script>

<section class="success">
	<h1>🎉 Order Placed Successfully!</h1>
	<p>Thanks for shopping with us.</p>

	<button on:click={() => goto('/products')}>
		Continue Shopping
	</button>
</section>

<style>
	.success {
		text-align: center;
		margin-top: 120px;
		color: white;
	}

	button {
		margin-top: 20px;
		padding: 12px 25px;
		background: #22c55e;
		border: none;
		border-radius: 10px;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}
</style>