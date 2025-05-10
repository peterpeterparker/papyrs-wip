<script lang="ts">
	import '$lib/styles/global.scss';
	import '$lib/styles/layout.scss';
	import { initSatellite } from '@junobuild/core';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Busy from '$lib/components/notifications/Busy.svelte';
	import Toasts from '$lib/components/notifications/Toasts.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import { i18n } from '$lib/stores/i18n.store';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const init = async () => {
		await i18n.init();

		await initSatellite({
			workers: {
				auth: true
			}
		});
	};
</script>

{#await init()}
	<div in:fade class="spinner">
		<Spinner />
	</div>
{:then _}
	{@render children()}

	<Busy />
	<Toasts />
{/await}

<style lang="scss">
	.spinner {
		--spinner-position: fixed;
	}
</style>
