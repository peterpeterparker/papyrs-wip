<script lang="ts">
	import { nonNullish } from '@dfinity/utils';
	import type { Editor } from '@tiptap/core';
	import { fade } from 'svelte/transition';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import EditorHeader from '$lib/components/ui/EditorHeader.svelte';
	import type { Markdown } from '$lib/types/core';

	interface Props {
		content: Markdown | undefined;
		onUpdate: (json: Markdown) => Promise<void>;
	}

	let { content, onUpdate }: Props = $props();

	let editor = $state<Editor | undefined>(undefined);
</script>

{#if nonNullish(content)}
	<div in:fade>
		<EditorHeader {editor} />

		<EditorContent bind:editor {content} {onUpdate} />
	</div>
{/if}
