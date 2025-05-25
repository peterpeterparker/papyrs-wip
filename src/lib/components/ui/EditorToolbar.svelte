<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import IconBold from '$lib/components/icons/IconBold.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import EditorImage from '$lib/components/ui/EditorImage.svelte';
	import { getEditorContext } from '$lib/context/editor.context.js';
	import { i18n } from '$lib/stores/i18n.store';
	import type { OnImgToUploadResult } from '$lib/types/editor';

	interface Props {
		onImgToUpload: (img: File) => Promise<OnImgToUploadResult>;
	}

	let { onImgToUpload }: Props = $props();

	let { store } = getEditorContext();

	let disabled = $derived(isNullish($store.editor));
</script>

<Button onclick={() => $store.editor?.chain().focus().toggleBold().run()} {disabled}>
	{#snippet icon()}
		<IconBold />
	{/snippet}

	{$i18n.editor.text.bold}
</Button>

<EditorImage {disabled} {onImgToUpload} />
