<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signOut,
		onAuthStateChanged
	} from 'firebase/auth';

	let user = null;
	let scrolled = false;
	let open = false;

	onMount(() => {
		onAuthStateChanged(auth, (u) => {
			user = u;
		});

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	async function login() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	}

	async function logout() {
		await signOut(auth);
		user = null;
	}
</script>

<nav class="navbar {scrolled ? 'scrolled' : ''}">
	<div class="container">

		<a class="brand" href="/">🌌 Galaxy</a>

		<!-- DESKTOP -->
		<ul class="nav-links desktop">
			<li><a href="/">Home</a></li>
			<li><a href="/products">Products</a></li>
			<li><a href="/reviews">Reviews</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>

		<div class="right">
			<a href="/profile" class="profile">
				👤 {user ? user.displayName : 'Profile'}
			</a>

			{#if user}
				<button class="btn" on:click={logout}>Logout</button>
			{:else}
				<button class="btn primary" on:click={login}>Login</button>
			{/if}

			<!-- HAMBURGER -->
			<button class="hamburger" on:click={() => open = !open}>
				☰
			</button>
		</div>

	</div>

	<!-- MOBILE MENU -->
	{#if open}
		<div class="mobile-menu">
			<a href="/" on:click={() => open=false}>Home</a>
			<a href="/products" on:click={() => open=false}>Products</a>
			<a href="/reviews" on:click={() => open=false}>Reviews</a>
			<a href="/contact" on:click={() => open=false}>Contact</a>
		</div>
	{/if}
</nav>

<style>
/* ===== BASE NAVBAR ===== */
.navbar{
	position:sticky;
	top:0;
	z-index:1000;

	background:rgba(11,18,32,0.5);
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);

	border-bottom:1px solid rgba(255,255,255,0.08);

	transition:0.3s;
}

.navbar.scrolled{
	background:rgba(11,18,32,0.95);
	box-shadow:0 10px 30px rgba(0,0,0,0.4);
}

/* CONTAINER */
.container{
	max-width:1200px;
	margin:auto;
	padding:12px 20px;

	display:flex;
	justify-content:space-between;
	align-items:center;
}

/* BRAND */
.brand{
	font-size:1.7rem;
	font-weight:900;
	color:white;
	text-decoration:none;
}

/* DESKTOP LINKS */
.nav-links{
	display:flex;
	gap:18px;
	list-style:none;
}

.nav-links a{
	color:white;
	text-decoration:none;
	position:relative;
}

.nav-links a:hover{
	color:#60a5fa;
}

/* RIGHT SIDE */
.right{
	display:flex;
	align-items:center;
	gap:10px;
}

.profile{
	color:white;
	text-decoration:none;
}

/* BUTTONS */
.btn{
	padding:6px 12px;
	border-radius:8px;
	border:1px solid rgba(255,255,255,0.2);
	background:transparent;
	color:white;
	cursor:pointer;
}

.btn.primary{
	background:#2563eb;
	border:none;
}

/* HAMBURGER */
.hamburger{
	display:none;
	font-size:22px;
	background:none;
	border:none;
	color:white;
	cursor:pointer;
}

/* MOBILE MENU */
.mobile-menu{
	display:flex;
	flex-direction:column;
	background:rgba(11,18,32,0.95);
	padding:15px;
	gap:10px;
}

.mobile-menu a{
	color:white;
	text-decoration:none;
	padding:10px;
	border-radius:8px;
}

.mobile-menu a:hover{
	background:rgba(255,255,255,0.1);
}

/* RESPONSIVE */
@media(max-width:768px){
	.nav-links{
		display:none;
	}

	.hamburger{
		display:block;
	}
}
</style>