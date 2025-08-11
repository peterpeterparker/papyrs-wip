<script lang="ts">
	import IconMenu from '$lib/components/icons/IconMenu.svelte';
	import IconNew from '$lib/components/icons/IconNew.svelte';
	import IconPublish from '$lib/components/icons/IconPublish.svelte';
	import Dirty from '$lib/components/toolbar/Dirty.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Popover from '$lib/components/ui/Popover.svelte';
	import { syncBusy } from '$lib/derived/sync.derived';
	import { i18n } from '$lib/stores/i18n.store';
	import { modalStore } from '$lib/stores/modal.store';

	let visible: boolean | undefined;
	let button: HTMLButtonElement | undefined;

	const close = () => (visible = false);

	const onAction = (callback: () => void) => {
		close();

		callback();
	};
</script>

<Button onclick={() => (visible = true)} bind:button>
	{#snippet icon()}
		<IconMenu />
	{/snippet}

	{$i18n.nav.menu}
</Button>

<Popover anchor={button} bind:visible>
	{#if $syncBusy}
		<Dirty />
	{:else}
		<button class="menu" aria-haspopup="menu" role="menuitem" type="button">
			<IconNew />
			<span>{$i18n.tools.new}</span>
		</button>

		<button
			class="menu"
			aria-haspopup="menu"
			onclick={() => onAction(() => modalStore.openPublish())}
			role="menuitem"
			type="button"
		>
			<IconPublish />
			<span>{$i18n.publish_edit.text.publish}</span>
		</button>
	{/if}
</Popover>

<style lang="scss">
	hr {
		width: 100%;
		margin: 0.45rem auto;
		background: black;
	}
</style>
