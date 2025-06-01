<script lang="ts">
	import { isNullish, notEmptyString } from '@dfinity/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import Value from '$lib/components/ui/Value.svelte';
	import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '$lib/constants/publish.constants';
	import { initEditorContext } from '$lib/context/editor.context';
	import { getEditable } from '$lib/services/idb.services';
	import { i18n } from '$lib/stores/i18n.store';
	import { toasts } from '$lib/stores/toasts.store';
	import type { Html, Markdown } from '$lib/types/core';

	interface Props {
		onclose: () => void;
		onsubmit: ($event: SubmitEvent) => Promise<void>;
	}

	let { onclose, onsubmit }: Props = $props();

	initEditorContext();

	let title = $state('');
	let description = $state('');
	let markdown = $state<Markdown | undefined>(undefined);
	let html = $state<Html | undefined>(undefined);

	const handleErrorOnLoad = (err?: unknown) => {
		onclose();

		toasts.error({
			msg: { text: $i18n.publish_edit.errors.get_editable },
			err
		});
	};

	const load = async () => {
		try {
			const editable = await getEditable();

			if (isNullish(editable) || editable.length !== 3) {
				handleErrorOnLoad();
				return;
			}

			const [metadata, userContent] = editable;

			title = (metadata.title ?? '').substring(0, TITLE_MAX_LENGTH);
			description = (metadata.description ?? '').substring(0, DESCRIPTION_MAX_LENGTH);
			markdown = userContent;
		} catch (err: unknown) {
			handleErrorOnLoad(err);
		}
	};

	onMount(load);
</script>

<form {onsubmit}>
	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.title}
		{/snippet}

		<input
			type="text"
			bind:value={title}
			placeholder={$i18n.publish_edit.text.title}
			maxlength={TITLE_MAX_LENGTH}
		/>
	</Value>

	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.description}
		{/snippet}

		<textarea
			rows="5"
			bind:value={description}
			placeholder={$i18n.publish_edit.text.description}
			maxlength={DESCRIPTION_MAX_LENGTH}
		></textarea>
	</Value>

	<p>TODO - URL</p>

	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.blog_post}
		{/snippet}

		{#if notEmptyString(markdown)}
			<div in:fade class="preview">
				<EditorContent
					content={markdown}
					editable={false}
					papyrusDisplay={false}
					onCreate={(content) => (html = content)}
				/>
			</div>
		{/if}
	</Value>

	<div class="toolbar" role="toolbar">
		<button type="button" onclick={onclose}>{$i18n.core.cancel}</button>
		<button class="primary">{$i18n.publish_edit.text.publish}</button>
	</div>
</form>

<style lang="scss">
	.toolbar {
		display: flex;
		gap: var(--padding-2x);
	}

	input,
	textarea {
		width: 100%;
		margin: 0 0 var(--padding-4x);
	}

	.preview {
    background: var(--color-primary);
    padding: var(--padding-2_5x);
		margin: 0 0 var(--padding-2_5x);
	}
</style>
