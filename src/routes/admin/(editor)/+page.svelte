<script lang="ts">
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';
	import Worker from '$lib/components/core/Worker.svelte';
	import DocEditor from '$lib/components/editor/DocEditor.svelte';
	import AdminToolbar from '$lib/components/toolbar/AdminToolbar.svelte';
</script>

<AdminToolbar />

<AuthGuard>
	{#snippet welcome()}
		<h1>Welcome Admin</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis felis in magna
			tincidunt, in semper dolor mattis.
		</p>
	{/snippet}

	<Worker>
		<DocEditor />
	</Worker>
</AuthGuard>
