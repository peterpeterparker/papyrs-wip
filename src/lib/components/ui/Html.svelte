<script lang="ts">
	import { nonNullish } from '@dfinity/utils';
	import { onMount } from 'svelte';
	import { sanitize } from '$lib/utils/html.utils';

	export let text: string | undefined = undefined;

	// force to rerender after SSR
	let mounted = false;
	onMount(() => (mounted = true));
</script>

{#if mounted && nonNullish(text)}
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html sanitize(text)}
{/if}
