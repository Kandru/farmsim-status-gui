<script>
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navbar from '../components/Navbar.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Navbar />
	<div class="container-fluid">
		{@render children()}
	</div>
</ParaglideJS>
