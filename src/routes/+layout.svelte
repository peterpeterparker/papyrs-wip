<script lang="ts">
	import '$lib/styles/global.scss';
	import { initSatellite } from '@junobuild/core';
	import type { Snippet } from 'svelte';

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

<style lang="scss" global>
	@use '../lib/styles/mixins/main';

	:root {
		@include main.layout;
	}
</style>
