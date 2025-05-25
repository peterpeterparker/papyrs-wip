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

<Popover bind:visible anchor={button}>
	{#if $syncBusy}
		<Dirty />
	{:else}
		<button type="button" role="menuitem" aria-haspopup="menu" class="menu">
			<IconNew />
			<span>{$i18n.tools.new}</span>
		</button>

		<button
			type="button"
			role="menuitem"
			aria-haspopup="menu"
			class="menu"
			onclick={() => onAction(() => modalStore.openPublish())}
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
