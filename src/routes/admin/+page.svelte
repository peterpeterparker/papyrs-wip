<script lang="ts">
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';
	import DocEditor from '$lib/components/editor/DocEditor.svelte';
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
</script>

<Toolbar />

<AuthGuard>
	{#snippet welcome()}
		<h1>Welcome Admin</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis felis in magna
			tincidunt, in semper dolor mattis.
		</p>
	{/snippet}

	<DocEditor />
</AuthGuard>
