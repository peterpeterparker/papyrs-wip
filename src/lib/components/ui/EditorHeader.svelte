<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import EditorToolbar from '$lib/components/ui/EditorToolbar.svelte';

	interface Props {
		editor: Editor | undefined;
	}

	// eslint-disable-next-line svelte/no-unused-props
	let props: Props = $props();
</script>

<aside class="flex flex-wrap gap-0.5 border-b-2 border-black bg-violet-200 p-2">
	<EditorToolbar {...props} />
</aside>
