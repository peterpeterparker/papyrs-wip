<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import IconUpload from '$lib/components/icons/IconUpload.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getEditorContext } from '$lib/context/editor.context.js';
	import { i18n } from '$lib/stores/i18n.store';
	import type { OnImgToUploadResult } from '$lib/types/editor';

	interface Props {
		disabled: boolean;
		onImgToUpload: (img: File) => Promise<OnImgToUploadResult>;
	}

	let { disabled, onImgToUpload }: Props = $props();

	const { store } = getEditorContext();

	let input = $state<HTMLInputElement | undefined>(undefined);

	const onChange = async (event: Event) => {
		const target = event.target as unknown as { files: File[] };
		const file: File | undefined = target?.files[0];

		if (isNullish(file)) {
			// I guess we are fine at this point if no image is provided on change
			return;
		}

		const result = await onImgToUpload(file);

		if (result.result === 'error') {
			return;
		}

		const { url } = result;
		$store.editor?.chain().focus().setImage({ src: url }).run();
	};
</script>

<Button onclick={() => input?.click()} {disabled}>
	{#snippet icon()}
		<IconUpload />
	{/snippet}

	{$i18n.editor.text.upload_image}
</Button>

<input
	bind:this={input}
	type="file"
	onchange={onChange}
	{disabled}
	accept="image/png, image/jpeg, image/svg+xml"
/>

<style lang="scss">
	input {
		visibility: hidden;
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>
