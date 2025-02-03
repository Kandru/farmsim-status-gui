<script>
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import 'picnic/picnic.min.css';
	
	let { children } = $props();
</script>

<link rel="stylesheet" href="/css/darkmode.css">
<link rel="stylesheet" href="/css/style.css">

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
