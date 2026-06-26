<script>
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';


	let user = null;

	onMount(() => {
		onAuthStateChanged(auth, (u) => {
			user = u;
		});
	});

	async function login() {
	try {
		console.log("LOGIN CLICKED");  // 🔥 check click fire thay che ke nahi

		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

		console.log("LOGIN SUCCESS:", result.user);
	} catch (error) {
		console.log("LOGIN ERROR:", error);
		alert(error.message);
	}
}
async function logout() {
	try {
		console.log("BEFORE LOGOUT:", auth.currentUser);

		await signOut(auth);

		console.log("AFTER LOGOUT:", auth.currentUser);

		user = null;

		window.location.reload();

	} catch (error) {
		console.log("LOGOUT ERROR:", error);
	}
}
</script>
<nav class="navbar custom-navbar sticky-top">
	<div class="container">

		<a class="navbar-brand" href="/">
			🌌 Galaxy
		</a>

		<ul class="navbar-nav ms-auto">

	<li class="nav-item">
		<a class="nav-link" href="/">Home</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="/products">Products</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="/reviews">Reviews</a>
	</li>

	<li class="nav-item">
		<a class="nav-link" href="/contact">Contact</a>
	</li>

	<li class="nav-item">
	<a class="nav-link" href="/profile">
		👤 {user ? user.displayName : 'Profile'}
	</a>
</li>
		</ul>

	</div>
</nav>

<style>
.custom-navbar{
	background: linear-gradient(
		135deg,
		#0f172a,
		#1e293b
	);
	padding: 14px 0;
	box-shadow: 0 4px 25px rgba(0,0,0,0.15);
	backdrop-filter: blur(10px);
}

.container{
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.navbar-brand{
	font-size: 1.8rem;
	font-weight: 800;
	letter-spacing: 1px;
	color: white;
	text-decoration: none;
	transition: .3s;
}

.navbar-brand:hover{
	color: #60a5fa;
}

.navbar-nav{
	display: flex;
	flex-direction: row;
	gap: 12px;
	list-style: none;
	margin: 0;
	padding: 0;
	align-items: center;
}

.nav-link{
	color: white;
	text-decoration: none;
	font-weight: 500;
	padding: 8px 12px;
	position: relative;
	transition: .3s;
}

.nav-link:hover{
	color: #60a5fa;
}

.nav-link::after{
	content: "";
	position: absolute;
	left: 12px;
	bottom: 0;
	width: 0;
	height: 2px;
	background: #60a5fa;
	transition: .3s;
}

.nav-link:hover::after{
	width: calc(100% - 24px);
}

@media (max-width: 768px){

	.container{
		flex-direction: column;
		gap: 10px;
	}

	.navbar-nav{
		flex-wrap: wrap;
		justify-content: center;
	}
}
</style>