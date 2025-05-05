<script lang="ts">
	import Editor from '$lib/components/ui/Editor.svelte';
	import type { Markdown } from '$lib/types/core';

	let content = $state<Markdown>('# Hello World');

	const onUpdate = async (content: Markdown) => console.log(content);
</script>

<Editor {content} {onUpdate} />
