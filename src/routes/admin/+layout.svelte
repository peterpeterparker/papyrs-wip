<script lang="ts">
	import '$lib/styles/global.scss';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	<section>
		{@render children()}
	</section>
</main>
