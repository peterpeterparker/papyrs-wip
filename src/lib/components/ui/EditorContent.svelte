<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { onMount, onDestroy } from 'svelte';
	import { EDITOR_EXTENSIONS } from '$lib/constants/editor.constants';
	import { getEditorContext } from '$lib/context/editor.context.js';
	import type { Html, Markdown } from '$lib/types/core';

	interface Props {
		content: Markdown;
		onUpdate?: (json: Markdown) => Promise<void>;
		onCreate?: (html: Html) => void;
		editable?: boolean;
		papyrusDisplay?: boolean;
	}

	let { content, onUpdate, onCreate, editable = true, papyrusDisplay = true }: Props = $props();

	let editor = $state<Editor | undefined>(undefined);

	let { setEditor } = getEditorContext();

	let element: HTMLElement;

	// TODO: style?
	onMount(
		() =>
			(editor = new Editor({
				element,
				extensions: EDITOR_EXTENSIONS,
				editable,
				content,
				onTransaction: () => {
					// force re-render so `editor.isActive` works as expected
					editor = editor;
				},
				editorProps: {
					attributes: {
						class:
							'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl my-8 mx-5 focus:outline-none overflow-x-auto'
					}
				},
				onUpdate: async ({ editor }) => {
					const markdown = editor.storage.markdown.getMarkdown();
					await onUpdate?.(markdown);
				},
				onCreate: ({ editor }) => {
					onCreate?.(editor.getHTML());
				}
			}))
	);

	onDestroy(() => {
		editor?.destroy();
		editor = undefined;
	});

	$effect(() => setEditor(editor));
</script>

<article bind:this={element} class:papyrus={papyrusDisplay}></article>

<style lang="scss">
	@use '../../styles/mixins/doc';

	article {
		@include doc.article;
		@include doc.placeholder;

		&:not(.papyrus) {
			max-height: 200px;
			overflow-y: auto;
			padding: var(--padding-0_5x) var(--padding);
		}

		:global(div[contenteditable='true']) {
			outline: none;
		}
	}
</style>
