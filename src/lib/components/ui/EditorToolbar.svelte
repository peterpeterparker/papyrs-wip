<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import type { Editor } from '@tiptap/core';
	import IconBold from '$lib/components/icons/IconBold.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { i18n } from '$lib/stores/i18n.store';

	export let editor: Editor | undefined;

	let disabled = true;
	$: disabled = isNullish(editor);
</script>

<Button onclick={() => editor?.chain().focus().toggleBold().run()} {disabled}>
	{#snippet icon()}
		<IconBold />
	{/snippet}

	{$i18n.editor.bold}
</Button>
