<script lang="ts">
	import '$lib/styles/global.scss';
	import type { Snippet } from 'svelte';
	import { initSatellite } from '@junobuild/core';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const init = async () => {
		await initSatellite({
			workers: {
				auth: true
			}
		});
	};

	$effect(() => {
		init();
	});
</script>

{@render children()}
