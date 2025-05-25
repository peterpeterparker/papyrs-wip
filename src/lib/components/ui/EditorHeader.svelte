<script lang="ts">
	import EditorToolbar from '$lib/components/ui/EditorToolbar.svelte';
	import type { OnImgToUploadResult } from '$lib/types/editor';

	interface Props {
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
