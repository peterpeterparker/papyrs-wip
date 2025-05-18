<script lang="ts">
	import { nonNullish } from '@dfinity/utils';
	import type { NavigationTarget } from '@sveltejs/kit';
	import { afterNavigate, goto } from '$app/navigation';
	import IconBack from '$lib/components/icons/IconBack.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { i18n } from '$lib/stores/i18n.store';

	let fromRoute: NavigationTarget | null = $state(null);

	afterNavigate(({ from }) => {
		fromRoute = from;
	});

	const back = async ({ pop }: { pop: boolean }) => {
		if (pop) {
			history.back();
			return;
		}

		await goto('/');
	};
</script>

<nav>
	<Button onclick={async () => await back({ pop: nonNullish(fromRoute) })}>
		{#snippet icon()}
			<IconBack />
		{/snippet}

		{$i18n.core.back}
	</Button>
</nav>
