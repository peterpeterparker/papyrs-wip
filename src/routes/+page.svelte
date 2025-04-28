<script lang="ts">
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<AuthGuard>Hello</AuthGuard>
