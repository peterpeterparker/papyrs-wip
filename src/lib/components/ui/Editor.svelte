<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import type { Markdown } from '$lib/types/core';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';

	export let content: Markdown;
	export let onUpdate: (json: Markdown) => Promise<void>;

	let editor: Editor | undefined;
</script>

<div>
	<EditorContent bind:editor {content} {onUpdate} />
</div>
