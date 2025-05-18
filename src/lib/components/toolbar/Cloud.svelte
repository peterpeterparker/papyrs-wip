<script lang="ts">
	import type { Component } from 'svelte';
	import IconCloud from '$lib/components/icons/IconCloud.svelte';
	import IconSync from '$lib/components/icons/IconSync.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Popover from '$lib/components/ui/Popover.svelte';
	import { syncBusy, syncError } from '$lib/derived/sync.derived';
	import { busy } from '$lib/stores/busy.store';
	import { i18n } from '$lib/stores/i18n.store';

	let visible = $state(false);
	let button = $state<HTMLButtonElement | undefined>(undefined);

	const syncLabel = (): string => {
		if ($syncBusy) {
			return $i18n.sync.cloud_in_progress;
		}

		if ($syncError) {
			return $i18n.sync.cloud_error;
		}

		return $i18n.sync.cloud_idle;
	};

	const syncIcon = (): Component => {
		if ($syncBusy) {
			return IconSync;
		}

		return IconCloud;
	};

	let label = $derived(syncLabel());
	let Icon = $derived(syncIcon());
</script>

<Button onclick={() => (visible = true)} bind:button>
	{#snippet icon()}
		<div class="icon" class:error={$syncError}>
			<Icon />
		</div>
	{/snippet}

	{$i18n.sync.cloud}
</Button>

<Popover bind:visible anchor={button} direction="rtl">
	<div class="info">
		<h2>{$i18n.sync.status}</h2>
		<p>{$i18n.sync.info}</p>
		<p>{@html label}</p>
	</div>
</Popover>

<style lang="scss">
	@use '../../styles/mixins/overlay';

	.icon {
		display: contents;
	}

	.error {
		color: var(--color-error);
	}

	.info {
		@include overlay.content;
	}
</style>
