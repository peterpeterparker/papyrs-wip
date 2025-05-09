<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import IconClose from '$lib/components/icons/IconClose.svelte';
	import { i18n } from '$lib/stores/i18n.store';

	export let anchor: HTMLElement | undefined = undefined;
	export let visible = false;
	export let direction: 'ltr' | 'rtl' = 'ltr';
	export let center = false;
	export let closeButton = false;

	let bottom: number;
	let left: number;

	const initPosition = () =>
		({ bottom, left } = anchor ? anchor.getBoundingClientRect() : { bottom: 0, left: 0 });

	$: anchor, initPosition();

	const close = () => (visible = false);
</script>

<svelte:window on:resize={initPosition} />

{#if visible}
	<div
		role="menu"
		aria-orientation="vertical"
		transition:fade
		class="popover"
		tabindex="-1"
		style="--popover-top: {`${bottom}px`}; --popover-left: {`${left}px`}"
		on:click|stopPropagation
	>
		<div class="backdrop" on:click|stopPropagation={() => (visible = false)} />
		<div
			transition:scale={{ delay: 25, duration: 150, easing: quintOut }}
			class="wrapper"
			class:center
			class:rtl={direction === 'rtl'}
		>
			{#if closeButton}
				<button on:click|stopPropagation={close} aria-label={$i18n.core.close} class="close icon"
					><IconClose /></button
				>
			{/if}

			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../styles/mixins/overlay';

	.popover {
		@include overlay.popover;
	}
</style>
