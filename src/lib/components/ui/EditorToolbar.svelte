<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import type { Editor } from '@tiptap/core';
	import IconBold from '$lib/components/icons/IconBold.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import EditorImage from '$lib/components/ui/EditorImage.svelte';
	import { i18n } from '$lib/stores/i18n.store';
	import type { OnImgToUploadResult } from '$lib/types/editor';

	interface Props {
		editor: Editor | undefined;
		onImgToUpload: (img: File) => Promise<OnImgToUploadResult>;
	}

	let { editor, onImgToUpload }: Props = $props();

	let disabled = $derived(isNullish(editor));
</script>

<Button onclick={() => editor?.chain().focus().toggleBold().run()} {disabled}>
	{#snippet icon()}
		<IconBold />
	{/snippet}

	{$i18n.editor.text.bold}
</Button>

<EditorImage {editor} {disabled} {onImgToUpload} />
