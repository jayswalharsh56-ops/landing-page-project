<footer class="footer">
	<div class="container">

		<div class="footer-grid">

			<!-- BRAND -->
			<div>
				<h2 class="brand">🌌 Galaxy Store</h2>
				<p>
					Premium gadgets, smartphones & accessories
					at best prices with fast delivery.
				</p>
			</div>

			<!-- LINKS -->
			<div>
				<h3>Quick Links</h3>
				<a href="/">Home</a>
				<a href="/products">Products</a>
				<a href="/reviews">Reviews</a>
				<a href="/contact">Contact</a>
			</div>

			<!-- SUPPORT -->
			<div>
				<h3>Support</h3>
				<a href="#">Shipping Policy</a>
				<a href="#">Return Policy</a>
				<a href="#">Privacy Policy</a>
				<a href="#">Help Center</a>
			</div>

			<!-- CONTACT -->
			<div>
				<h3>Contact</h3>
				<p>📞 +91 99999 99999</p>
				<p>📧 support@galaxy.com</p>
				<p>📍 India</p>
			</div>

		</div>

		<div class="bottom">
			<p>© 2026 Galaxy Store. All Rights Reserved.</p>
		</div>

	</div>
</footer>

<style>
.footer{
	margin-top:60px;
	padding:60px 0 20px;

	background: rgba(11,18,32,0.7);
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);

	border-top:1px solid rgba(255,255,255,0.08);
	color:white;
}

/* GRID */
.footer-grid{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:30px;
	max-width:1200px;
	margin:auto;
	padding:0 20px;
}

/* BRAND */
.brand{
	font-size:1.5rem;
	font-weight:800;
	margin-bottom:10px;
}

/* LINKS */
.footer a{
	display:block;
	color:rgba(255,255,255,0.7);
	text-decoration:none;
	margin:6px 0;
	transition:0.3s;
}

.footer a:hover{
	color:#60a5fa;
	transform:translateX(4px);
}

/* HEADINGS */
.footer h3{
	margin-bottom:10px;
	color:white;
}

/* BOTTOM */
.bottom{
	text-align:center;
	margin-top:40px;
	padding-top:20px;
	border-top:1px solid rgba(255,255,255,0.08);
	color:rgba(255,255,255,0.6);
}

/* RESPONSIVE */
@media(max-width:768px){
	.footer-grid{
		grid-template-columns:repeat(2,1fr);
	}

	.footer{
		text-align:center;
	}

	.footer a{
		display:inline-block;
		margin:5px 10px;
	}
}

@media(max-width:500px){
	.footer-grid{
		grid-template-columns:1fr;
	}
}
</style>	