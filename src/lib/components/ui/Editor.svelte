<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import EditorHeader from '$lib/components/ui/EditorHeader.svelte';
	import type { Markdown } from '$lib/types/core';

	interface Props {
		content: Markdown;
		onUpdate: (json: Markdown) => Promise<void>;
	}

	let { content, onUpdate }: Props = $props();

	let editor = $state<Editor | undefined>(undefined);
</script>

<div>
	<EditorHeader {editor} />

	<EditorContent bind:editor {content} {onUpdate} />
</div>
