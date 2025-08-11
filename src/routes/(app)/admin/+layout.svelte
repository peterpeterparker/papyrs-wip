<script lang="ts">
	import '$lib/styles/global.scss';
	import type { Snippet } from 'svelte';
	import Modals from '$lib/components/modals/Modals.svelte';

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

<Modals />
