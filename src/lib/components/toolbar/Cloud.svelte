<script lang="ts">
	import type { Component } from 'svelte';
	import IconCloud from '$lib/components/icons/IconCloud.svelte';
	import IconSync from '$lib/components/icons/IconSync.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Popover from '$lib/components/ui/Popover.svelte';
	import { busy } from '$lib/stores/busy.store';
	import { i18n } from '$lib/stores/i18n.store';
	import { sync } from '$lib/stores/sync.store';

	let visible = $state(false);
	let button = $state<HTMLButtonElement | undefined>(undefined);

	const syncLabel = (): string => {
		switch ($sync.sync) {
			case 'error':
				return $i18n.sync.cloud_error;
			case 'in_progress':
				return $i18n.sync.cloud_in_progress;
			case 'init':
				return $i18n.sync.cloud_pending;
			default:
				return $i18n.sync.cloud_idle;
		}
	};

	const syncIcon = (): Component => {
		if (['in_progress', 'pending', 'init'].includes($sync.sync)) {
			return IconSync;
		}

		return IconCloud;
	};

	const showLog = ($event: UIEvent) => {
		$event.stopPropagation();

		busy.show();

		visible = false;
	};

	let label = $state(syncLabel());
	let Icon = $state(syncIcon());
</script>

<Button onclick={() => (visible = true)} bind:button>
	{#snippet icon()}
		<div class="icon">
			{Icon}
		</div>
	{/snippet}

	{$i18n.sync.cloud}
</Button>

<Popover bind:visible anchor={button} direction="rtl">
	<div class="info">
		<h2>{$i18n.sync.status}</h2>
		<p>{$i18n.sync.info}</p>
		<p>{@html label}</p>

		<button type="button" onclick={showLog}> Log </button>
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
