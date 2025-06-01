<script lang="ts">
	import { nonNullish } from '@dfinity/utils';
	import EditorContent from '$lib/components/ui/EditorContent.svelte';
	import Html from '$lib/components/ui/Html.svelte';
	import { markdownToHTML } from '$lib/utils/markdown.utils';

	interface Props {
		markdown: string;
	}

	let { markdown }: Props = $props();

	let html = $state<string | undefined>(undefined);

	const transformMarkdownToHTML = async (content: string) => {
		html = await markdownToHTML(content);
		markdown = content?.replaceAll('\n', '<br/>');
	};

	$effect(() => {
		transformMarkdownToHTML(markdown);
	});
</script>

<article>
	<Html text={html} />
</article>

<EditorContent content={markdown} editable={false} />

<style lang="scss">
	@use '../../styles/mixins/shadow';

	article {
		@include shadow.extra-strong;

		max-height: 200px;
		overflow-y: auto;

		width: 100%;
		margin: 0 0 var(--padding-4x);

		padding: 0.25rem 0.45rem;
	}
</style>
