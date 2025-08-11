<script lang="ts">
	import { isEmptyString, isNullish, notEmptyString } from '@dfinity/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import Value from '$lib/components/ui/Value.svelte';
	import {
		DESCRIPTION_MAX_LENGTH,
		TITLE_MAX_LENGTH,
		URL_SLUG_MAX_LENGTH
	} from '$lib/constants/publish.constants';
	import { initEditorContext } from '$lib/context/editor.context';
	import { getEditable } from '$lib/services/idb.services';
	import { i18n } from '$lib/stores/i18n.store';
	import { toasts } from '$lib/stores/toasts.store';
	import type { Html, Markdown } from '$lib/types/core';
	import type { PublishData } from '$lib/types/publish';
	import {
		validateDescription,
		validateSlug,
		validateTitle
	} from '$lib/utils/publish-assertions.utils';
	import { titleToSlug } from '$lib/utils/publish.utils';

	interface Props {
		onclose: () => void;
		onsubmit: ($event: Omit<PublishData, 'status'>) => Promise<void>;
	}

	let { onclose, onsubmit }: Props = $props();

	initEditorContext();

	let key = $state('');
	let title = $state('');
	let description = $state('');
	let slug = $state('');
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

			const [metadata, userContent, postKey] = editable;

			title = (metadata.title ?? '').substring(0, TITLE_MAX_LENGTH);
			description = (metadata.description ?? '').substring(0, DESCRIPTION_MAX_LENGTH);
			slug = notEmptyString(metadata?.slug)
				? metadata.slug
				: (titleToSlug(title) ?? '').substring(0, URL_SLUG_MAX_LENGTH);
			markdown = userContent;
			key = postKey;
		} catch (err: unknown) {
			handleErrorOnLoad(err);
		}
	};

	onMount(load);

	let validTitleInput = $derived(validateTitle(title));
	let validDescriptionInput = $derived(validateDescription(description));
	let validSlugInput = $derived(validateSlug(slug));
	// let validCanonicalInput = $derived(validateCanonical());

	let validInput = $derived(validTitleInput && validDescriptionInput && validSlugInput);

	const onSubmitPublish = async ($event: SubmitEvent) => {
		$event.preventDefault();

		if (isEmptyString(html)) {
			toasts.error({
				msg: { text: $i18n.publish_edit.errors.empty_post }
			});
			return;
		}

		await onsubmit({
			key,
			title,
			description,
			slug,
			html
		});
	};
</script>

<form onsubmit={onSubmitPublish}>
	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.title}
		{/snippet}

		<input
			maxlength={TITLE_MAX_LENGTH}
			placeholder={$i18n.publish_edit.text.title}
			type="text"
			bind:value={title}
		/>
	</Value>

	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.description}
		{/snippet}

		<textarea
			maxlength={DESCRIPTION_MAX_LENGTH}
			placeholder={$i18n.publish_edit.text.description}
			rows="5"
			bind:value={description}
		></textarea>
	</Value>

	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.slug}
		{/snippet}

		<input
			maxlength={URL_SLUG_MAX_LENGTH}
			placeholder={$i18n.publish_edit.text.slug}
			type="text"
			bind:value={slug}
		/>
	</Value>

	<hr />

	<Value>
		{#snippet label()}
			{$i18n.publish_edit.text.blog_post}
		{/snippet}

		{#if notEmptyString(markdown)}
			<div class="preview" in:fade>
				<EditorContent
					content={markdown}
					editable={false}
					onCreate={(content) => (html = content)}
					papyrusDisplay={false}
				/>
			</div>
		{/if}
	</Value>

	<div class="toolbar" role="toolbar">
		<button onclick={onclose} type="button">{$i18n.core.cancel}</button>
		<button class="primary" disabled={!validInput}>{$i18n.publish_edit.text.publish}</button>
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
