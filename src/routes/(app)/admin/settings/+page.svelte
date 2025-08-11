<script lang="ts">
	import Settings from '$lib/components/admin/Settings.svelte';
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';
	import Nav from '$lib/components/toolbar/Nav.svelte';
</script>

<Nav />

<AuthGuard>
	{#snippet welcome()}
		<h1>Welcome Admin</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis felis in magna
			tincidunt, in semper dolor mattis.
		</p>
	{/snippet}

	<Settings />
</AuthGuard>
