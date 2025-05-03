<script lang="ts">
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
</script>

<Toolbar />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<AuthGuard>Hello</AuthGuard>
