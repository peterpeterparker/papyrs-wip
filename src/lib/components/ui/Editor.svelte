<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import EditorHeader from '$lib/components/ui/EditorHeader.svelte';
	import type { Markdown } from '$lib/types/core';

	export let content: Markdown;
	export let onUpdate: (json: Markdown) => Promise<void>;

	let editor: Editor | undefined;
</script>

<div>
	<EditorHeader {editor} />

	<EditorContent bind:editor {content} {onUpdate} />
</div>
