<section class="contact-page">

	<div class="container py-5">

		<div class="text-center mb-5">
			<h1 class="display-4 fw-bold">Contact Us</h1>
			<p class="lead text-light">
				Have questions about our products? We'd love to hear from you.
			</p>
		</div>

		<div class="row g-5 align-items-center">

			<!-- LEFT SIDE -->
			<div class="col-lg-5">

				<div class="info-card">

					<h3 class="mb-4">Get In Touch</h3>

					<div class="info-item">
						<div class="icon">📧</div>
						<div>
							<h6>Email</h6>
							<p>support@galaxystore.com</p>
						</div>
					</div>

					<div class="info-item">
						<div class="icon">📞</div>
						<div>
							<h6>Phone</h6>
							<p>+91 90238 08042</p>
						</div>
					</div>

					<div class="info-item">
						<div class="icon">📍</div>
						<div>
							<h6>Location</h6>
							<p>Rajkot, Gujarat, India</p>
						</div>
					</div>

					<div class="info-item">
						<div class="icon">🕒</div>
						<div>
							<h6>Working Hours</h6>
							<p>Mon - Sat : 9 AM - 8 PM</p>
						</div>
					</div>

				</div>

			</div>

			<!-- RIGHT SIDE -->
			<div class="col-lg-7">

				<div class="contact-card">

					<h3 class="mb-4">Send Message</h3>

					<form>

						<div class="row">
							<div class="col-md-6 mb-3">
								<input
									type="text"
									class="form-control custom-input"
									placeholder="Full Name"
								/>
							</div>

							<div class="col-md-6 mb-3">
								<input
									type="email"
									class="form-control custom-input"
									placeholder="Email Address"
								/>
							</div>
						</div>

						<div class="mb-3">
							<input
								type="text"
								class="form-control custom-input"
								placeholder="Subject"
							/>
						</div>

						<div class="mb-3">
							<textarea
								rows="6"
								class="form-control custom-input"
								placeholder="Write your message..."
							></textarea>
						</div>

						<button class="btn send-btn w-100">
							Send Message 🚀
						</button>

					</form>

				</div>

			</div>

		</div>

	</div>

</section>

<style>

.contact-page{
	min-height:100vh;
	color:white;
}

.contact-card,
.info-card{
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(15px);

	border:1px solid rgba(255,255,255,0.1);

	padding:35px;
	border-radius:25px;

	box-shadow:
		0 15px 35px rgba(0,0,0,0.25);
}

.custom-input{
	background: rgba(255,255,255,0.08);
	border:1px solid rgba(255,255,255,0.15);
	color:white;
	padding:14px;
	border-radius:12px;
}

.custom-input::placeholder{
	color:#cbd5e1;
}

.custom-input:focus{
	background: rgba(255,255,255,0.12);
	color:white;
	border-color:#60a5fa;

	box-shadow:
		0 0 15px rgba(96,165,250,0.4);
}

.info-item{
	display:flex;
	align-items:center;
	gap:15px;
	margin-bottom:25px;
}

.icon{
	width:55px;
	height:55px;

	display:flex;
	align-items:center;
	justify-content:center;

	border-radius:50%;

	background:
		linear-gradient(
			135deg,
			#2563eb,
			#7c3aed
		);

	font-size:24px;
}

.info-item h6{
	margin:0;
	font-weight:700;
}

.info-item p{
	margin:0;
	color:#cbd5e1;
}

.send-btn{
	background:
		linear-gradient(
			135deg,
			#2563eb,
			#7c3aed
		);

	border:none;
	color:white;

	font-weight:700;

	padding:14px;

	border-radius:14px;

	transition:0.3s;
}

.send-btn:hover{
	transform:translateY(-3px);

	box-shadow:
		0 15px 30px rgba(37,99,235,0.4);
}

</style>