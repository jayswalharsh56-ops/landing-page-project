
<script>
	const reviews = [
		{
			name: "Rahul Sharma",
			rating: "⭐⭐⭐⭐⭐",
			text: "Amazing service and fast delivery. My iPhone arrived in just 2 days."
		},
		{
			name: "Priya Patel",
			rating: "⭐⭐⭐⭐⭐",
			text: "Original products and excellent customer support."
		},
		{
			name: "Jay Mehta",
			rating: "⭐⭐⭐⭐⭐",
			text: "Best smartphone deals I found online."
		},
		{
			name: "Aarav Shah",
			rating: "⭐⭐⭐⭐⭐",
			text: "Packaging was premium and delivery was super quick."
		},
		{
			name: "Neha Joshi",
			rating: "⭐⭐⭐⭐⭐",
			text: "Loved the experience. Will definitely buy again."
		},
		{
			name: "Vivek Patel",
			rating: "⭐⭐⭐⭐⭐",
			text: "Great prices and trusted products."
		}
	];
</script>

<section class="container py-5 text-white">

	<div class="text-center mb-5">
		<h1 class="display-3 fw-bold">Customer Reviews</h1>
		<p class="lead">
			Trusted by thousands of happy customers
		</p>
	</div>

	<!-- STATS -->

	<div class="row g-4 mb-5">

		<div class="col-md-4">
			<div class="stats-box">
				<h1>10K+</h1>
				<p>Happy Customers</p>
			</div>
		</div>

		<div class="col-md-4">
			<div class="stats-box">
				<h1>4.9★</h1>
				<p>Average Rating</p>
			</div>
		</div>

		<div class="col-md-4">
			<div class="stats-box">
				<h1>15K+</h1>
				<p>Products Delivered</p>
			</div>
		</div>

	</div>

	<!-- REVIEWS -->

	<div class="row g-4">

		{#each reviews as review}

			<div class="col-md-4">

				<div class="review-card">

					<div class="stars">
						{review.rating}
					</div>

					<p class="review-text">
						"{review.text}"
					</p>

					<h5>
						{review.name}
					</h5>

				</div>

			</div>

		{/each}

	</div>

</section>

<!-- WHY CHOOSE US -->

<section class="container py-5 text-white">

	<h2 class="text-center mb-5 fw-bold">
		Why Customers Choose Us
	</h2>

	<div class="row g-4">

		<div class="col-md-3">
			<div class="feature-box">
				🚚
				<h4>Fast Delivery</h4>
				<p>Delivery across India.</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="feature-box">
				🛡️
				<h4>Warranty</h4>
				<p>100% Genuine Products.</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="feature-box">
				💳
				<h4>Secure Payment</h4>
				<p>Safe Online Payments.</p>
			</div>
		</div>

		<div class="col-md-3">
			<div class="feature-box">
				⭐
				<h4>Top Rated</h4>
				<p>4.9 Star Average Rating.</p>
			</div>
		</div>

	</div>

</section>

<!-- CTA -->

<section class="container py-5">

	<div class="review-banner text-center text-white">

		<h2>Join 10,000+ Happy Customers</h2>

		<p class="mt-3">
			Shop premium smartphones and gadgets today.
		</p>

		<a href="/products" class="btn btn-light btn-lg mt-3">
			Explore Products
		</a>

	</div>

</section>

<style>

.stats-box{
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(15px);
	padding:30px;
	border-radius:20px;
	text-align:center;
	border:1px solid rgba(255,255,255,0.15);
	transition:.3s;
}

.stats-box:hover{
	transform:translateY(-10px);
}

.stats-box h1{
	font-size:3rem;
	font-weight:800;
	color:#60a5fa;
}

.review-card{
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(15px);
	padding:25px;
	border-radius:20px;
	border:1px solid rgba(255,255,255,0.15);
	height:100%;
	transition:.3s;
}

.review-card:hover{
	transform:translateY(-10px);
	box-shadow:0 20px 40px rgba(37,99,235,.3);
}

.stars{
	font-size:22px;
	margin-bottom:15px;
}

.review-text{
	color:#cbd5e1;
}

.feature-box{
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(15px);
	padding:30px;
	border-radius:20px;
	text-align:center;
	border:1px solid rgba(255,255,255,0.15);
	transition:.3s;
}

.feature-box:hover{
	transform:translateY(-10px);
}

.review-banner{
	padding:60px;
	border-radius:25px;
	background:linear-gradient(135deg,#2563eb,#7c3aed);
}

.review-banner h2{
	font-size:2.2rem;
	font-weight:800;
}

</style>

