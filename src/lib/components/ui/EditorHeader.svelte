<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import EditorToolbar from '$lib/components/ui/EditorToolbar.svelte';
	import type { OnImgToUploadResult } from '$lib/types/editor';

	interface Props {
		editor: Editor | undefined;
		onImgToUpload: (img: File) => Promise<OnImgToUploadResult>;
	}

	// eslint-disable-next-line svelte/no-unused-props
	let props: Props = $props();
</script>

<aside>
	<EditorToolbar {...props} />
</aside>

<style lang="scss">
	aside {
		display: flex;
		flex-wrap: wrap;
		gap: var(--padding);
	}
</style>
