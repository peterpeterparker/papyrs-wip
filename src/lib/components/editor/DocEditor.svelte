<script lang="ts">
	import Editor from '$lib/components/ui/Editor.svelte';
	import { setContent } from '$lib/services/idb.services';
	import type { Markdown } from '$lib/types/core';

	let content = $state<Markdown>('# Hello World');

	const onUpdate = async (content: Markdown) => await setContent(content);
</script>

<Editor {content} {onUpdate} />
